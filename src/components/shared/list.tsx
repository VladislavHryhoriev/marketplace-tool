import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const List = ({ children, className }: Props) => {
  return (
    <div
      className={cn("mt-6 min-h-[500px] rounded-md rounded-tl-none", className)}
    >
      <div>{children}</div>
    </div>
  );
};
