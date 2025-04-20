"use client";
import {
  epicentrSearchTypes,
  TEpicentrSearchType,
} from "@/clients/epicentr/types";
import {
  rozetkaSearchTypes,
  TRozetkaSearchType,
} from "@/clients/rozetka/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUserConfigStore from "@/store/userConfigStore";
import { RefreshCcw, Store } from "lucide-react";

const MarketsCard = () => {
  const { market, setMarket, resetMarket } = useUserConfigStore();

  return (
    <Card className="border-zinc-700 bg-zinc-800/80">
      <CardHeader className="flex flex-row items-center gap-2">
        <Store className="size-5 text-zinc-400" />
        <CardTitle className="text-lg text-zinc-100">
          Магазины (Поиск)
        </CardTitle>
        <Button variant="outline" size="sm" onClick={resetMarket}>
          <RefreshCcw className="size-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {/* Розетка */}
        <div className="grid grid-cols-2 items-center gap-4">
          <p className="text-right text-sm">Тип заказов Розетка:</p>
          <Select
            value={`${market.rozetkaSearchType}`}
            onValueChange={(value) =>
              setMarket({
                rozetkaSearchType: +value as TRozetkaSearchType,
              })
            }
          >
            <SelectTrigger className="dark:bg-zinc-900/50 dark:hover:dark:bg-zinc-900">
              <SelectValue placeholder="Тип заказов" />
            </SelectTrigger>
            <SelectContent className="border-zinc-700">
              {Object.entries(rozetkaSearchTypes).map(([key, value]) => (
                <SelectItem key={value} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Эпицентр */}
        <div className="grid grid-cols-2 items-center gap-4">
          <p className="text-right text-sm">Тип заказов Эпицентр:</p>
          <Select
            value={`${market.epicenterSearchType}`}
            onValueChange={(value) =>
              setMarket({
                epicenterSearchType: value as TEpicentrSearchType,
              })
            }
          >
            <SelectTrigger className="dark:bg-zinc-900/50 dark:hover:dark:bg-zinc-900">
              <SelectValue placeholder="Тип заказов" />
            </SelectTrigger>
            <SelectContent className="border-zinc-700">
              {Object.entries(epicentrSearchTypes).map(([key, value]) => (
                <SelectItem key={value} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketsCard;
