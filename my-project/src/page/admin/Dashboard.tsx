import { Suspense } from "react";
import Dashboard from "../../components/Admin/Dashboard/Dashboard";
import DashboardSkeleton from "../../components/Admin/Dashboard/DashboardSkeleton";

const DashboardPage = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
