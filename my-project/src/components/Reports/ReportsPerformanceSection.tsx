import DashboardCard from "../UI/ChartCard";
import LineChartCard from "../Charts/LineChartCard";
import { TrendingUp } from "lucide-react";
import CardChartLoader from "../CardLoader";

type ReportsPerformanceSectionProps = {
  data: {
    performanceMetrics: {
      date: string;
      label: string;
      value1: number;
      value2: number;
      value3: number;
    }[];
  };
  isLoading: boolean;
};

const ReportsPerformanceSection = ({
  data,
  isLoading,
}: ReportsPerformanceSectionProps) => {
  return (
    <>
      <CardChartLoader isLoading={isLoading}>
        <DashboardCard
          title="Performance Metrics"
          subtitle="Last 7 days"
          icon={TrendingUp}
        >
          <LineChartCard data={data?.performanceMetrics ?? []} />
        </DashboardCard>
      </CardChartLoader>
    </>
  );
};

export default ReportsPerformanceSection;
