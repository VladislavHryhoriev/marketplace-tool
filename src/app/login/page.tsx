"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/config";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
      name,
      password,
      callbackUrl: ROUTES[0].path,
    });

    if (res?.error) {
      setError(res.error);
      return;
    }
  };

  if (session.status === "unauthenticated") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <form onSubmit={handleLogin} className="rounded bg-zinc-800 p-4">
          <div className="flex flex-col gap-2">
            <h2 className="mb-2 text-center text-lg font-semibold text-zinc-200">
              Логин
            </h2>
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите логин"
                className="bg-zinc-900"
                required
                autoComplete="off"
              />

              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="bg-zinc-900"
                required
                autoComplete="off"
              />
            </div>
            {error && (
              <p className="text-center text-xs text-red-500">{error}</p>
            )}
            <Button type="submit" className="mt-4 w-full">
              Войти
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
