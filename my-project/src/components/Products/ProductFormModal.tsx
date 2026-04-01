import { Barcode, Check, DollarSign, Map } from "lucide-react";
import Modal from "../UI/Modal";
import { categories, vatTypes } from "../../utils/constants";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import type { ProductType } from "../../utils/types";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../../utils/utils";
import ModalLoading from "../ModalLoading";

type ProductFormModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedProductId: number | null;
  isEdit: boolean;
};

type FormData = {
  sku: string;
  barcode: string;
  productName: string;
  price: number;
  category: string;
  location: string;
  vatType: string;
  stock: number;
  stockLow: number;
  stockCritical: number;
  stockHigh: number;
};

const ProductFormModal = ({
  isModalOpen,
  isCloseModal,
  isEdit,
  selectedProductId,
}: ProductFormModalProps) => {
  const queryClient = useQueryClient();
  const { formData, handleChange, setField } = useForm<FormData>({
    sku: "",
    barcode: "",
    productName: "",
    price: 0,
    category: "",
    location: "",
    vatType: "",
    stock: 0,
    stockLow: 0,
    stockCritical: 0,
    stockHigh: 0,
  });

  const {
    data: selectedProduct,
    isLoading,
    isError,
  } = useQuery<ProductType>({
    queryKey: ["product-data", selectedProductId],
    queryFn: fetchData(
      `http://localhost:5001/api/product/${selectedProductId}`,
    ),
    enabled: !!selectedProductId,
  });

  useEffect(() => {
    if (!isEdit || !selectedProduct) return;

    setField("sku", selectedProduct.sku);
    setField("barcode", selectedProduct.barcode);
    setField("productName", selectedProduct.productName);
    setField("price", selectedProduct.price);
    setField("category", selectedProduct.category);
    setField("location", selectedProduct.location);
    setField("vatType", selectedProduct.vatType);
    setField("stock", selectedProduct.stock);
    setField("stockLow", selectedProduct.stockLow);
    setField("stockCritical", selectedProduct.stockCritical);
    setField("stockHigh", selectedProduct.stockHigh);
  }, [isEdit, selectedProduct]);

  console.log("Selected Product Id: ", selectedProductId);

  const productMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let response;

      const payload = {
        sku: formData.sku,
        barcode: formData.barcode,
        product_name: formData.productName,
        price: Number(formData.price),
        category: formData.category,
        location: formData.location,
        vat_type: formData.vatType,

        stock: Number(formData.stock),
        stock_low: Number(formData.stockLow),
        stock_critical: Number(formData.stockCritical),
        stock_high: Number(formData.stockHigh),
      };

      if (isEdit) {
        if (!selectedProduct) return;

        response = await fetch(
          `http://localhost:5001/api/product/${selectedProduct.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
        );
      } else {
        response = await fetch("http://localhost:5001/api/product", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Create Product Failed");
      }

      return data;
    },

    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["products-data"] });
      queryClient.invalidateQueries({
        queryKey: ["product-list-summary-cards"],
      });
    },

    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    productMutation.mutate(formData);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={isEdit ? "Edit Product" : "Add Product"}
    >
      {isEdit && isLoading ? (
        <ModalLoading title={isEdit ? "Edit Product" : "Add Product"} />
      ) : (
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Enter SKU"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Barcode
              </label>
              <div className="relative">
                <Barcode
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  placeholder="Scan or enter barcode"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vat Type
                </label>
                <select
                  name="vatType"
                  value={formData.vatType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Vat Type
                  </option>
                  {vatTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <div className="relative">
                  <DollarSign
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <Map
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    placeholder="Shelf 1"
                  />
                </div>
              </div>
            </div>

            {!isEdit && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  placeholder="0"
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              {/* Low Stock */}
              <div>
                <label className="block text-sm font-medium text-yellow-600 mb-1">
                  Low Stock
                </label>
                <input
                  type="number"
                  name="stockLow"
                  value={formData.stockLow}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-400"
                  placeholder="10"
                />
              </div>

              {/* Critical Stock */}
              <div>
                <label className="block text-sm font-medium text-orange-600 mb-1">
                  Critical Stock
                </label>
                <input
                  type="number"
                  name="stockCritical"
                  value={formData.stockCritical}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-400"
                  placeholder="5"
                />
              </div>

              {/* High Stock */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  High Stock
                </label>
                <input
                  type="number"
                  name="stockHigh"
                  value={formData.stockHigh}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
                  placeholder="100"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                {isEdit ? "Edit Product" : "Add Product"}
              </button>

              <button
                type="button"
                onClick={isCloseModal}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ProductFormModal;
