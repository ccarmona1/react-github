import type { FC } from "react";

export const LoadingSpinner: FC = () => (
  <div className="flex justify-center items-center py-12">
    <span
      className="inline-block w-10 h-10 border-4 border-sky-300 border-t-transparent rounded-full animate-spin"
      aria-label="Loading"
    />
  </div>
);
