import { Suspense } from "react";
import DashboardPage from "../components/dashboard/DashboardPage";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

const Dashboard = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPage />
    </Suspense>
  );
};

export default Dashboard;
