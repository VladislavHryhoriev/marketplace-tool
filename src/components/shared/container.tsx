interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={`container mx-auto max-w-5xl px-2 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
