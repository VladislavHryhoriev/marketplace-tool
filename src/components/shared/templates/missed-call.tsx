import { Button } from "@/components/ui/button";

interface Props {
  handler: (type?: string) => void;
}

export const MissedCall = ({ handler }: Props) => {
  return (
    <div>
      <Button handler={handler}>Недозвон</Button>
    </div>
  );
};
