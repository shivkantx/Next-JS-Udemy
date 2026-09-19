import { requireAuth } from "@/lib/auth-guard";
import Image from "next/image";

async function Home() {
  const session = await requireAuth();
  const { user } = session;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-white">
      <Image
        src={user.image || "/default-avatar.png"}
        alt="User image"
        className="h-50 w-50 object-contain"
        height={50}
        width={50}
      />
    </div>
  );
}

export default Home;
