"use client";

import { ReactNode } from "react";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

const headingSizes = {
  1: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold",
  2: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold",
  3: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold",
  4: "text-base sm:text-lg md:text-xl font-semibold",
  5: "text-sm sm:text-base md:text-lg font-semibold",
  6: "text-sm sm:text-base font-semibold",
};

export const Heading = ({ level, children, className = "" }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizeClass = headingSizes[level];
  
  return (
    <Tag className={`${sizeClass} text-gray-900 ${className}`}>
      {children}
    </Tag>
  );
};
