import { Suspense } from "react";
import InventorySkeleton from "../components/inventory/InventorySkeleton";
import EmployeeProductivityPage from "../components/productivity/EmployeesProductivityPage";

const Employees = () => {
  return (
    <Suspense fallback={<InventorySkeleton />}>
      <EmployeeProductivityPage />
    </Suspense>
  );
};

export default Employees;
