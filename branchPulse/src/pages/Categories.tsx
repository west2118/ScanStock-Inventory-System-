import CategoryTable from "../components/categories/CategoryTable";

const CategoriesPage = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white">
      <CategoryTable />
    </div>
  );
};

export default CategoriesPage;
