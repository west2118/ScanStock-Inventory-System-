import {
  ShoppingCart,
  Download,
  Printer,
  RefreshCw,
  Receipt,
  Package,
  Users,
} from "lucide-react";
import TransactionTable from "../components/Transactions/TransactionTable";
import { useQuery } from "@tanstack/react-query";
import { fetchData, pesoFormatter } from "../utils/utils";
import SummaryStatCardListSkeleton from "../components/Skeletons/SummaryStatCardListSkeleton";
import SummaryStatCardList from "../components/SummaryStatCardList";

type TransactionSummaryCards = {
  totalTransactionsToday: number;
  totalItemSalesToday: number;
  totalCustomers: number;
  totalAvgOrder: number;
};

const TransactionsPage = () => {
  const { data, isLoading, isError } = useQuery<TransactionSummaryCards>({
    queryKey: ["transaction-summary-cards"],
    queryFn: fetchData("http://localhost:5001/api/transactions/summary-cards"),
  });

  const summaryCards = [
    {
      title: "Today's Transactions",
      value: data?.totalTransactionsToday ?? 0,
      subtitle: "sales completed today",
      icon: ShoppingCart,
      iconColor: "text-blue-600",
    },
    {
      title: "Items Sold Today",
      value: data?.totalItemSalesToday ?? 0,
      subtitle: "total units sold",
      icon: Package,
      iconColor: "text-green-600",
    },
    {
      title: "Total Customers",
      value: data?.totalCustomers ?? 0,
      subtitle: "customers served",
      icon: Users,
      iconColor: "text-purple-600",
    },
    {
      title: "Average Order",
      value: `${pesoFormatter.format(Number(data?.totalAvgOrder)) ?? 0}`,
      subtitle: "average transaction value",
      icon: Receipt,
      iconColor: "text-orange-600",
    },
  ];

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SummaryStatCardListSkeleton key={index} />
            ))
          : summaryCards.map((summary) => (
              <SummaryStatCardList key={summary.title} summary={summary} />
            ))}
      </div>

      <TransactionTable />
    </main>
  );
};

export default TransactionsPage;
