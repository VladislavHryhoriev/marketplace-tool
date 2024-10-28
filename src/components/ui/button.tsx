import clsx from "clsx";

interface Props {
  handler?: () => void;
  children?: React.ReactNode;
}

export const Button = ({ handler, children }: Props) => {
  return (
    <button
      className={clsx(
        "rounded-md bg-orange-500 px-4 py-2 shadow-lg hover:bg-orange-500 active:translate-y-0.5 active:bg-orange-600",
      )}
      onClick={handler}
    >
      {children}
    </button>
  );
};
