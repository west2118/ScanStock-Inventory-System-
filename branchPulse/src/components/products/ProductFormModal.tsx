import { Barcode, DollarSign, Plus, X, Trash2, Image as ImageIcon, List as ListIcon } from "lucide-react";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ModalLoading from "../ModalLoading";
import { fetchData } from "../../lib/utils";
import type { ProductType } from "../../lib/types";
import Modal from "../ui/Modal";
import { categories, computerBrands, vatTypes } from "../../lib/constants";

type ProductFormModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedProductId: number | null;
  isEdit: boolean;
};

type ProductImage = { imageUrl: string; sortOrder?: number; isPrimary?: boolean };
type ProductSpec = { name: string; value: string };

type FormData = {
  sku: string;
  barcode: string;
  slug: string;
  productName: string;
  price: number | string;
  categoryId: number | string;
  brandId: number | string;
  vatType: string;
  status: string;
  images: ProductImage[];
  specifications: ProductSpec[];
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
    slug: "",
    productName: "",
    price: "",
    categoryId: "",
    brandId: "",
    vatType: "",
    status: "",
    images: [],
    specifications: [],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/categories`),
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/brands`),
  });

  const { data: selectedProduct, isLoading } = useQuery<ProductType>({
    queryKey: ["product-data", selectedProductId],
    queryFn: fetchData(
      `http://localhost:5001/api/product/${selectedProductId}`,
    ),
    enabled: !!selectedProductId,
  });

  useEffect(() => {
    if (!isEdit || !selectedProduct) return;

    setField("sku", selectedProduct.sku);
    setField("barcode", selectedProduct.barcode || "");
    setField("slug", selectedProduct.slug || "");
    setField("productName", selectedProduct.productName);
    setField("price", selectedProduct.price);
    setField("categoryId", selectedProduct.categoryId || "");
    setField("vatType", selectedProduct.vatType || "");
    setField("brandId", selectedProduct.brandId || "");
    setField("status", selectedProduct.status || "");
    setField("images", selectedProduct.images || []);
    setField("specifications", selectedProduct.specifications || []);
  }, [isEdit, selectedProduct]);

  const productMutation = useMutation({
    mutationFn: async () => {
      let response;

      const payload = {
        ...formData,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
        brandId: Number(formData.brandId),
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
    productMutation.mutate();
  };

  const handleAddImage = () => {
    setField("images", [...formData.images, { imageUrl: "", sortOrder: 0, isPrimary: false }]);
  };
  const handleRemoveImage = (index: number) => {
    setField("images", formData.images.filter((_, i) => i !== index));
  };
  const handleImageChange = (index: number, field: keyof ProductImage, value: any) => {
    const newImages = [...formData.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setField("images", newImages);
  };

  const handleAddSpec = () => {
    setField("specifications", [...formData.specifications, { name: "", value: "" }]);
  };
  const handleRemoveSpec = (index: number) => {
    setField("specifications", formData.specifications.filter((_, i) => i !== index));
  };
  const handleSpecChange = (index: number, field: keyof ProductSpec, value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setField("specifications", newSpecs);
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={isEdit ? "Edit Product" : "Add Product"}
      width="max-w-2xl"
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
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="enter-product-slug"
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
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((category: any) => {
                    if (category.id === "all") return null;
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
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
                  Brand
                </label>

                <select
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Brand
                  </option>

                  {brands.map((brand: any) => {
                    if (brand.id === "all") return null;
                    return (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    );
                  })}
                </select>
              </div>
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Images Section */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ImageIcon size={16} className="text-gray-400" />
                  Product Images
                </label>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  <Plus size={14} /> Add Image
                </button>
              </div>
              <div className="space-y-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="flex gap-2 items-start bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="flex-1 space-y-2">
                      <input
                        type="url"
                        value={img.imageUrl}
                        onChange={(e) => handleImageChange(index, "imageUrl", e.target.value)}
                        placeholder="Image URL"
                        className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-xs text-gray-600">
                          <input
                            type="checkbox"
                            checked={img.isPrimary}
                            onChange={(e) => handleImageChange(index, "isPrimary", e.target.checked)}
                            className="rounded text-blue-600"
                          />
                          Primary Image
                        </label>
                        <input
                          type="number"
                          value={img.sortOrder}
                          onChange={(e) => handleImageChange(index, "sortOrder", Number(e.target.value))}
                          placeholder="Sort order (0)"
                          className="w-24 px-2 py-1 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Section */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ListIcon size={16} className="text-gray-400" />
                  Specifications
                </label>
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  <Plus size={14} /> Add Spec
                </button>
              </div>
              <div className="space-y-2">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={spec.name}
                      onChange={(e) => handleSpecChange(index, "name", e.target.value)}
                      placeholder="Name (e.g. Color)"
                      className="w-1/3 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                      placeholder="Value (e.g. Black)"
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-200 flex gap-3">
              <button
                type="button"
                onClick={isCloseModal}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                {isEdit ? "Edit Product" : "Add Product"}
              </button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ProductFormModal;
