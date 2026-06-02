import { Suspense } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import DashboardSkeleton from "../components/Dashboard/DashboardSkeleton";

const DashboardPage = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
