import { Suspense } from "react";
import SalesComparisonPage from "../components/sales/SalesComparisonPage";
import SalesSkeleton from "../components/sales/SalesSkeleton";

const SalesComparison = () => {
  return (
    <Suspense fallback={<SalesSkeleton />}>
      <SalesComparisonPage />
    </Suspense>
  );
};

export default SalesComparison;
