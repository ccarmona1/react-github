import type { FC, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`bg-white shadow-sm rounded-lg p-6 m-3 border border-sky-100 ${className}`}
  >
    {children}
  </div>
);
