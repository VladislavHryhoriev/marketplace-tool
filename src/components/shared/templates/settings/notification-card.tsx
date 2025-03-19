"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useUserConfigStore from "@/store/userConfigStore";
import { Bell } from "lucide-react";

const NotificationCard = () => {
  const { notifications, setNotifications } = useUserConfigStore();

  return (
    <Card className="border-zinc-700 bg-zinc-800/80">
      <CardHeader className="flex flex-row items-center gap-2">
        <Bell className="size-5 text-zinc-400" />
        <CardTitle className="text-lg text-zinc-100">Уведомления</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Switch
            id="browserNotifications"
            checked={notifications.browser}
            onCheckedChange={(checked) =>
              setNotifications({ browser: checked })
            }
            className="data-[state=checked]:bg-emerald-500 dark:data-[state=unchecked]:bg-zinc-500/50"
          />
          <Label htmlFor="browserNotifications">
            Присылать уведомления в браузер
          </Label>
        </div>
        <div className="flex items-center gap-4">
          <Switch
            id="telegramNotifications"
            checked={notifications.telegram}
            onCheckedChange={(checked) =>
              setNotifications({ telegram: checked })
            }
            className="data-[state=checked]:bg-emerald-500 dark:data-[state=unchecked]:bg-zinc-500/50"
          />
          <Label htmlFor="telegramNotifications">
            Присылать уведомления в Telegram
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
