import { Package, ShoppingCart, Users, Receipt } from "lucide-react";
import SummaryStatsCard from "../SummaryStatsCard";
import { useMemo } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetchData, pesoFormatter } from "../../utils/utils";

type TransactionSummaryCards = {
  totalTransactionsToday: number;
  totalItemSalesToday: number;
  totalCustomers: number;
  totalAvgOrder: number;
};

const TransactionSummarySection = () => {
  const { data } = useSuspenseQuery<TransactionSummaryCards>({
    queryKey: ["transaction-summary-cards"],
    queryFn: fetchData("http://localhost:5001/api/transactions/summary-cards"),
  });

  const summaryCards = useMemo(
    () => [
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
    ],
    [data],
  );

  return <SummaryStatsCard summaryCards={summaryCards} />;
};

export default TransactionSummarySection;
