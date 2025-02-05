"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const token = data.get("token");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authToken: token }),
    });

    const json = await res.json();

    router.push("/menu/api");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={formHandler} className="rounded bg-zinc-800 p-4">
        <div>
          <h2 className="mb-2 text-center text-lg font-semibold text-zinc-200">
            Токен
          </h2>
          <Input
            type="text"
            name="token"
            placeholder="Введите токен"
            className="bg-zinc-900"
            required
            autoComplete="off"
          />
          <Button type="submit" className="mt-4 w-full">
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
}
