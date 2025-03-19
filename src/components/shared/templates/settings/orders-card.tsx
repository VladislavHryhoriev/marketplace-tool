"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import usePollingStore from "@/store/pollingStore";
import useUserConfigStore from "@/store/userConfigStore";
import { SquareChartGantt } from "lucide-react";

const OrdersCard = () => {
  const { notifications, setNotifications } = useUserConfigStore();
  const maxSum = usePollingStore((state) => state.maxSum);
  const setMaxSum = usePollingStore((state) => state.setMaxSum);

  return (
    <Card className="border-zinc-700 bg-zinc-800/80">
      <CardHeader className="flex flex-row items-center gap-2">
        <SquareChartGantt className="size-5 text-zinc-400" />
        <CardTitle className="text-lg text-zinc-100">Заказы</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Switch
            id="sendToProcess"
            checked={notifications.sendToProcess}
            onCheckedChange={(checked) =>
              setNotifications({
                sendToProcess: checked,
              })
            }
            className="data-[state=checked]:bg-emerald-500 dark:data-[state=unchecked]:bg-zinc-500/50"
          />
          <Label htmlFor="sendToProcess">Кидать в обработку заказы до:</Label>
          <Input
            className="w-18 bg-zinc-900/50"
            id="maxSum"
            value={maxSum}
            autoComplete="off"
            onChange={(e) => setMaxSum(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersCard;
