import { Button } from "@/components/ui/button";

interface Props {
  handler: (type?: string) => void;
}

export const AutoConfirm = ({ handler }: Props) => {
  return (
    <div>
      <Button handler={handler}>Автоподтверждение</Button>
    </div>
  );
};
