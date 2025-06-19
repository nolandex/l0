import { ReactNode } from "react";

type LineTextProps = {
  children: ReactNode;
};

export const LineText = ({ children }: LineTextProps) => {
  return (
    <span className="relative whitespace-nowrap text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] leading-tight font-extrabold text-slate-900 dark:text-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 418 42"
        className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
        preserveAspectRatio="none"
      >
        <path d="..."></path>
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
};
