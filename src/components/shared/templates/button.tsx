import { Button } from "@/components/ui/button";

interface Props {
  handler: (type?: string) => void;
  title: string;
}

export const TemplateButton = ({ handler, title }: Props) => {
  return (
    <div>
      <Button handler={handler}>{title}</Button>
    </div>
  );
};
