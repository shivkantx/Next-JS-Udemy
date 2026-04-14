import Image from "next/image";

async function getUsers() {
  const res = await fetch("http://localhost:3000/api/hello", {
    cache: "no-store", // always fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export default async function Home() {
  const result = await getUsers();
  const users = result.data;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
        Users List
      </h1>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {users.map((user: any) => (
          <div
            key={user.id}
            className="p-5 rounded-xl shadow bg-white dark:bg-zinc-900 border dark:border-zinc-800"
          >
            <h2 className="text-xl font-semibold text-black dark:text-white">
              {user.name}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">📧 {user.email}</p>
            <p className="text-zinc-600 dark:text-zinc-400">
              🎂 Age: {user.age}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
