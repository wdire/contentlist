"use client";

import clsx from "clsx";

const SectionContainer = ({
  children,
  className,
  paddingClass,
  type = "default",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  paddingClass?: string;
  type?: "default" | "list-page";
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "max-w-full mx-auto",
        {
          "w-[1200px]": type === "default",
          "w-[1200px] xl:w-[1310px] xl:px-15 2xl:w-[1480px]": type === "list-page",

          "px-3 sm:px-5": !paddingClass,
          [`${paddingClass}`]: paddingClass,
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
