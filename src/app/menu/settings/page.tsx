"use client";
import AdminWrapper from "@/components/shared/admin-wrapper";
import NotificationCard from "@/components/shared/templates/settings/notification-card";
import OrdersCard from "@/components/shared/templates/settings/orders-card";
import MarketsCard from "@/components/shared/templates/settings/markets-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SettingsPage = () => {
  return (
    <div>
      <Card className="border-zinc-700 bg-zinc-800/80">
        <CardHeader>
          <CardTitle className="text-zinc-100">Настройки</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-2">
            <AdminWrapper>
              <OrdersCard />
            </AdminWrapper>
            <NotificationCard />
            <AdminWrapper>
              <MarketsCard />
            </AdminWrapper>
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
