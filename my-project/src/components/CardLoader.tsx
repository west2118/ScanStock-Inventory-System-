import type { ReactNode } from "react";
import { ChartCardSkeleton } from "./Skeletons/ChartCardSkeleton";

type CardLoaderProps = {
  isLoading: boolean;
  children: ReactNode;
  fallback?: ReactNode; // ✅ optional skeleton
};

const CardLoader = ({
  isLoading,
  children,
  fallback = <ChartCardSkeleton />,
}: CardLoaderProps) => {
  if (isLoading) return <>{fallback ?? null}</>; // default null if no fallback
  return <>{children}</>;
};

export default CardLoader;
