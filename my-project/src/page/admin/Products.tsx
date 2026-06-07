import ProductTable from "../../components/Admin/Products/ProductTable";
import ProductSummaryStats from "../../components/Admin/Products/ProductSummaryStats";

const Products = () => {
  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* Summary Cards */}
      <ProductSummaryStats />

      {/* Product Table */}
      <ProductTable />
    </main>
  );
};

export default Products;
