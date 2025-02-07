"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1>404</h1>
      <Button className="mt-2" onClick={() => router.back()}>
        Back
      </Button>
    </div>
  );
};

export default NotFound;
