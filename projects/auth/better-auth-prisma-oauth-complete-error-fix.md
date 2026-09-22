# Better Auth + Prisma + Neon OAuth Error Fix

## Project versions

-   Next.js: `16.3.3`
-   Better Auth: `1.7.1`
-   Prisma: `7.10.0`
-   React: `19.2.8`
-   Node.js: `24.4.1`
-   Database: PostgreSQL on Neon

------------------------------------------------------------------------

# 1. Main Google Login Error

The original Google OAuth flow reached Google successfully, but the
callback failed with:

``` text
[Better Auth]: Better auth was unable to query your database.

PrismaClientValidationError:

Invalid db[model].findFirst()

where:
  issuer: equals "https://accounts.google.com"
  accountId: equals "102618307363119862256"

Unknown argument `issuer`. Did you mean `user`?
```

The request sequence was:

``` text
POST /api/auth/sign-in/social 200
GET /api/auth/callback/google?... 302
GET /api/auth/error?error=internal_server_error 200
```

This proved that Google OAuth initiation was working. The failure
happened when Better Auth queried the Prisma `Account` model.

------------------------------------------------------------------------

# 2. Exact Cause: Missing `issuer`

## Your original `Account` model

Your original schema contained:

``` prisma
model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("account")
}
```

The missing field was:

``` prisma
issuer String?
```

But Better Auth was querying:

``` text
issuer = "https://accounts.google.com"
```

Therefore Prisma rejected the query.

------------------------------------------------------------------------

# 3. Exact Fix

Add this line to `Account`:

``` prisma
issuer String?
```

### Before

``` diff
   scope                 String?
   password              String?
   createdAt             DateTime  @default(now())
```

### After

``` diff
   scope                 String?
   password              String?
+  issuer                String?
   createdAt             DateTime  @default(now())
```

------------------------------------------------------------------------

# 4. Complete Correct `prisma/schema.prisma`

Use this complete file:

``` prisma
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]

  @@map("user")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("session")
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  issuer                String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("account")
}

model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([identifier])
  @@map("verification")
}
```

------------------------------------------------------------------------

# 5. Prisma Synchronization

Adding `issuer` to the schema is not enough. Synchronize the database
and generated client:

``` bash
npx prisma db push
```

Then:

``` bash
npx prisma generate
```

Then restart:

``` bash
npm run dev
```

The important chain is:

``` text
schema.prisma
      ↓
PostgreSQL database
      ↓
generated Prisma Client
      ↓
Better Auth
```

All four must agree.

------------------------------------------------------------------------

# 6. Earlier Database Timeout Problem

Before the `issuer` error, the project also had a Neon/PostgreSQL
connection problem:

``` text
PrismaClientKnownRequestError
code: ETIMEDOUT
modelName: Verification
```

A direct PostgreSQL test initially produced:

``` text
AggregateError [ETIMEDOUT]
IPv4 addresses port 5432 ETIMEDOUT
IPv6 addresses port 5432 ENETUNREACH
```

A direct connection using IPv4-first DNS succeeded.

The project was then changed from `PrismaPg` to the Neon adapter.

------------------------------------------------------------------------

# 7. Comparison: Original `lib/db.ts` vs Fixed

## Original approach

``` ts
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
```

This setup was associated with the Neon connection timeout encountered
during the debugging process.

## Fixed `lib/db.ts`

``` ts
import "dotenv/config";

import { PrismaClient } from "./generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

### Exact adapter change

``` diff
- import { PrismaPg } from "@prisma/adapter-pg";
+ import { PrismaNeon } from "@prisma/adapter-neon";

- const adapter = new PrismaPg({
+ const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  });
```

------------------------------------------------------------------------

# 8. Environment Variables

The project `.env` contains the required variables:

``` env
DATABASE_URL=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

The actual values must not be committed or shared.

They were verified through Node:

``` bash
node -r dotenv/config
```

Then:

``` js
console.log(!!process.env.GOOGLE_CLIENT_ID)
console.log(!!process.env.GOOGLE_CLIENT_SECRET)
console.log(!!process.env.DATABASE_URL)
```

The results were:

``` text
true
true
true
```

The `undefined` printed after `console.log()` in the Node REPL was not
an error.

For example:

``` text
> console.log(true)
true
undefined
```

`true` is the printed value. `undefined` is the return value of
`console.log()`.

GitHub variables were similarly verified:

``` js
console.log(!!process.env.GITHUB_CLIENT_ID)
console.log(!!process.env.GITHUB_CLIENT_SECRET)
```

Both returned `true`.

------------------------------------------------------------------------

# 9. Working `lib/auth.ts`

The working Better Auth configuration was:

``` ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  baseURL: "http://localhost:3000",

  trustedOrigins: ["http://localhost:3000"],

  logger: {
    level: "debug",
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
```

The important provider configuration is:

``` ts
google: {
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
},
```

and:

``` ts
github: {
  clientId: process.env.GITHUB_CLIENT_ID as string,
  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
},
```

------------------------------------------------------------------------

# 10. API Route

The Better Auth route is:

``` ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

Location:

``` text
app/api/auth/[...all]/route.ts
```

------------------------------------------------------------------------

# 11. Client Login Code

Your Google login code was already correct:

``` tsx
const handleGoogleLogin = async () => {
  setPending("google");

  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });
};
```

GitHub:

``` tsx
const handleGithubLogin = async () => {
  setPending("github");

  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/",
  });
};
```

The frontend code was not the cause of the original Google failure.

------------------------------------------------------------------------

# 12. `lib/auth-client.ts`

``` ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
```

------------------------------------------------------------------------

# 13. `lib/auth-guard.ts`

The guard code is:

``` ts
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function requireUnAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return session;
}
```

This was not the cause of the original Google OAuth failure.

------------------------------------------------------------------------

# 14. How We Confirmed Google Was Fixed

After adding `issuer`, synchronizing Prisma, and restarting Next.js, the
successful logs were:

``` text
POST /api/auth/sign-in/social 200
```

Then:

``` text
GET /api/auth/callback/google?... 302
```

Then:

``` text
GET / 200
```

This confirms the complete OAuth flow:

``` text
Login page
    ↓
Better Auth
    ↓
Google
    ↓
Google callback
    ↓
Prisma Account/User/Session
    ↓
Authenticated session
    ↓
/
```

The Google profile image also loaded successfully.

------------------------------------------------------------------------

# 15. GitHub Login

GitHub initially produced:

``` text
POST /api/auth/sign-in/social 500
```

The environment variables were verified as present.

For local development, the GitHub OAuth application's authorization
callback URL should correspond to:

``` text
http://localhost:3000/api/auth/callback/github
```

The GitHub OAuth application's Client ID and Client Secret must match
the values used in `.env`.

Google working proves that the general Better Auth + Prisma
infrastructure is functioning; a GitHub-only failure should therefore be
investigated as a GitHub provider/OAuth configuration issue.

------------------------------------------------------------------------

# 16. Other Errors Encountered

## `Unknown argument issuer`

### Cause

`Account` was missing:

``` prisma
issuer String?
```

### Fix

Add it and run:

``` bash
npx prisma db push
npx prisma generate
```

------------------------------------------------------------------------

## `Type "User" is neither a built-in type`

### Cause

The Prisma schema was accidentally reduced to only `Account`, while
`Account` still referenced:

``` prisma
user User
```

### Fix

Restore all four models:

``` text
User
Session
Account
Verification
```

------------------------------------------------------------------------

## `You don't have any datasource defined`

### Cause

The `datasource` block was missing from `schema.prisma`.

### Required block

``` prisma
datasource db {
  provider = "postgresql"
}
```

------------------------------------------------------------------------

## `ETIMEDOUT`

### Cause encountered

Database connectivity through the previous Prisma PostgreSQL adapter was
timing out against Neon.

### Fix used

Switch from:

``` ts
@prisma/adapter-pg
```

to:

``` ts
@prisma/adapter-neon
```

and use:

``` ts
new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
```

------------------------------------------------------------------------

## Generic Better Auth `ErrorEvent`

Example:

``` text
[Better Auth]: ErrorEvent {
  type: 'error'
}

POST /api/auth/sign-in/social 500
```

Do not immediately modify the Prisma schema.

Check:

1.  Environment variables
2.  Provider configuration
3.  Database connection
4.  Prisma schema/client
5.  Full terminal error
6.  OAuth callback configuration

------------------------------------------------------------------------

# 17. Future Troubleshooting Checklist

## Environment

``` bash
node -r dotenv/config
```

Then:

``` js
console.log(!!process.env.GOOGLE_CLIENT_ID)
console.log(!!process.env.GOOGLE_CLIENT_SECRET)
console.log(!!process.env.DATABASE_URL)
```

For GitHub:

``` js
console.log(!!process.env.GITHUB_CLIENT_ID)
console.log(!!process.env.GITHUB_CLIENT_SECRET)
```

------------------------------------------------------------------------

## Prisma schema

Check:

``` bash
grep -n "issuer" prisma/schema.prisma
```

If Better Auth reports:

``` text
Unknown argument `issuer`
```

make sure `Account` contains:

``` prisma
issuer String?
```

------------------------------------------------------------------------

## Synchronize Prisma

``` bash
npx prisma db push
npx prisma generate
```

Then:

``` bash
npm run dev
```

------------------------------------------------------------------------

## OAuth request sequence

### Successful OAuth

``` text
POST /api/auth/sign-in/social 200
GET /api/auth/callback/google ... 302
GET / 200
```

### Failure before provider redirect

``` text
POST /api/auth/sign-in/social 500
```

### Failure during callback

``` text
POST /api/auth/sign-in/social 200
GET /api/auth/callback/google ... 302
GET /api/auth/error ...
```

For callback failures, inspect the Prisma/Better Auth error immediately
before the callback response.

------------------------------------------------------------------------

# 18. Most Important Fix to Remember

The exact Google login failure was:

> Better Auth queried `Account.issuer`, but the Prisma `Account` model
> did not contain `issuer`.

The fix was:

``` prisma
issuer String?
```

followed by:

``` bash
npx prisma db push
npx prisma generate
```

and restarting Next.js.

A separate earlier problem was the Neon database connection timeout,
which was addressed by using `PrismaNeon`.

------------------------------------------------------------------------

# 19. Final Working Architecture

``` text
Login UI
   │
   ▼
authClient.signIn.social()
   │
   ▼
/api/auth/sign-in/social
   │
   ▼
Better Auth
   │
   ├── Google OAuth
   ├── GitHub OAuth
   │
   ▼
/api/auth/callback/[provider]
   │
   ▼
Prisma Adapter
   │
   ├── User
   ├── Account
   │    └── issuer
   ├── Session
   └── Verification
   │
   ▼
Authenticated session
   │
   ▼
/
```

------------------------------------------------------------------------

# 20. Quick Reference

``` text
[ ] .env has OAuth credentials
[ ] DATABASE_URL works
[ ] Better Auth provider is configured
[ ] Account contains issuer String?
[ ] User model exists
[ ] Session model exists
[ ] Verification model exists
[ ] npx prisma db push
[ ] npx prisma generate
[ ] npm run dev
[ ] OAuth callback URL is correct
[ ] Check POST /api/auth/sign-in/social
[ ] Check callback logs
```

## Security

Never commit or share:

``` text
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_SECRET
DATABASE_URL
```

If a real database password or OAuth secret is exposed, rotate it
immediately.
