import { fetchData } from "../../utils/utils";
import type { DashboardDataType } from "../../utils/types";
import DashboardSummarySection from "./DashboardSummarySection";
import DashboardTablesSection from "./DashboardTablesSection";
import { useSuspenseQuery } from "@tanstack/react-query";
import DashboardChartsSection from "./DashboardChartsSection";

const Dashboard = () => {
  const { data } = useSuspenseQuery<DashboardDataType>({
    queryKey: ["dashboard-data"],
    queryFn: fetchData(`http://localhost:5001/api/dashboard`),
  });

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <DashboardSummarySection summaryStats={data.summary} />
      <DashboardChartsSection chartsData={data.charts} />
      <DashboardTablesSection chartsData={data.charts} />
    </main>
  );
};

export default Dashboard;
