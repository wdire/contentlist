"use client";

import clsx from "clsx";

const SectionContainer = ({
  children,
  className,
  widthClass,
  paddingClass,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  widthClass?: string;
  paddingClass?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        "max-w-full mx-auto",
        {
          "w-[1200px]": !widthClass,
          [`${widthClass}`]: widthClass,

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
