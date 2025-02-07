"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/config";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push(ROUTES[0].path);
    }
  }, [session.status, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      authToken: token,
    });

    if (res?.error) {
      setError(res.error);
      return;
    }

    router.push(ROUTES[0].path);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleLogin} className="rounded bg-zinc-800 p-4">
        <div>
          <h2 className="mb-2 text-center text-lg font-semibold text-zinc-200">
            Токен
          </h2>
          <Input
            type="text"
            name="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Введите токен"
            className="bg-zinc-900"
            required
            autoComplete="off"
          />
          {error && <p className="text-center text-xs text-red-500">{error}</p>}
          <Button type="submit" className="mt-4 w-full">
            Войти
          </Button>
        </div>
      </form>
    </div>
  );
}
