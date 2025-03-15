"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
  return (
    <div>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        <LogOut />
      </Button>
    </div>
  );
};

export default SettingsPage;
