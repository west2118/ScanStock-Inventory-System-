import TransactionTable from "../components/Transactions/TransactionTable";
import TransactionSummarySection from "../components/Transactions/TransactionSummarySection";
import { Suspense } from "react";
import StatsCardSkeleton from "../components/Skeletons/StatsCardSkeleton";

const TransactionsPage = () => {
  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <Suspense fallback={<StatsCardSkeleton />}>
        <TransactionSummarySection />
      </Suspense>

      <TransactionTable />
    </main>
  );
};

export default TransactionsPage;
