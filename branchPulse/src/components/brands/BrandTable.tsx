import { useState } from "react";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchData } from "../../lib/utils";
import BrandFormModal from "./BrandFormModal";
import type { BrandType } from "../../lib/types";

const BrandTable = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const { data: brands, isLoading } = useQuery<BrandType[]>({
    queryKey: ["brands"],
    queryFn: async (context) => {
      const data = await fetchData(`${import.meta.env.VITE_API_URL}/brands`)(context);
      return data.filter((item: any) => item.id !== "all");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/brands/${id}/delete`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to delete brand");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Brand deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (brand: BrandType) => {
    setSelectedBrand(brand);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedBrand(null);
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const filteredBrands = brands?.filter((brand) =>
    brand.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Filters & Actions Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between w-full">
          <div className="flex flex-col sm:flex-row flex-1 gap-3 w-full">
            {/* Search Input */}
            <div className="relative flex-1 w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-xl text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto justify-center font-medium"
            >
              <Plus size={18} />
              <span>Add Brand</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Slug</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Logo</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Created At</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    Loading brands...
                  </td>
                </tr>
              ) : filteredBrands?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No brands found.
                  </td>
                </tr>
              ) : (
                filteredBrands?.map((brand) => (
                  <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">#{brand.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{brand.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{brand.slug}</td>
                    <td className="px-4 py-3 text-sm">
                      {brand.logoUrl ? (
                        <img src={brand.logoUrl} alt={brand.name} className="h-8 w-8 object-contain" />
                      ) : (
                        <span className="text-gray-400 italic">No logo</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${brand.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {brand.status ? brand.status.charAt(0).toUpperCase() + brand.status.slice(1) : ""}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(brand.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(brand)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <BrandFormModal
          isModalOpen={isModalOpen}
          isCloseModal={() => setIsModalOpen(false)}
          selectedBrand={selectedBrand}
          isEdit={isEdit}
        />
      </div>
    </>
  );
};

export default BrandTable;
