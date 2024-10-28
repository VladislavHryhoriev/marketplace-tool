import { Button } from "@/components/ui/button";

interface Props {
  handler: (type?: string) => void;
}

export const Uncollected = ({ handler }: Props) => {
  return (
    <div>
      <Button handler={handler}>Не забирает заказ</Button>
    </div>
  );
};
