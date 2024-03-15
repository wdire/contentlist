import clsx from "clsx";

const SectionContainer = ({
  children,
  className,
  widthClass,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  widthClass?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "max-w-full mx-auto px-1.5 sm:px-5",
        {
          "w-[1200px]": !widthClass,
          widthClass,
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
