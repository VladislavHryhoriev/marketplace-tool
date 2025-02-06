"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <button onClick={() => router.push("/login")}>Войти</button>
    </div>
  );
}
