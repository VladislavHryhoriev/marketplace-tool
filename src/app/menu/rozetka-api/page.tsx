"use client";
import { List } from "@/components/shared/list";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/get-products";
import { setStatus } from "@/lib/set-status";

const Page = () => {
  return (
    <List title="Rozetka.Api">
      <div className="mt-4 flex gap-2">
        <Button handler={setStatus}>Кинуть в обработку</Button>
        <Button handler={getProducts}>Поиск</Button>
      </div>
    </List>
  );
};

export default Page;
