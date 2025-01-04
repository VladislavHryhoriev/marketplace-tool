"use client";
import { List } from "@/components/shared/list";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/rozetka/get-products";
import { setStatus } from "@/lib/rozetka/set-status";

const Page = () => {
  return (
    <List title="Rozetka.Api">
      <div className="flex gap-2">
        <Button onClick={setStatus}>Кинуть в обработку</Button>
        <Button onClick={getProducts}>Поиск</Button>
      </div>
    </List>
  );
};

export default Page;
