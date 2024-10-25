import clsx from "clsx";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const List = ({ title, children, className }: Props) => {
  return (
    <div
      className={clsx(
        "min-h-[500px] rounded-md rounded-tl-none border-2 border-orange-500 p-4",
        className,
      )}
    >
      <h2 className="text-2xl">{title}</h2>
      <hr className="my-2 rounded-lg border border-zinc-500" />
      <div className="mt-4">{children}</div>
    </div>
  );
};
