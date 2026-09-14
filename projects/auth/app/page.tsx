import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900">
      <Button variant={"destructive"} size={"lg"}>
        Click me
      </Button>
    </div>
  );
}
