"use client";
import NotificationCard from "@/components/shared/templates/settings/notification-card";
import OrdersCard from "@/components/shared/templates/settings/orders-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const session = useSession();

  return (
    <div>
      <Card className="border-zinc-700 bg-zinc-800/80">
        <CardHeader>
          <CardTitle className="text-zinc-100">Настройки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {session.data?.user.role === "admin" && <OrdersCard />}
            <NotificationCard />
          </div>

          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
            >
              <LogOut className="mr-2 size-4" />
              Выйти
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
