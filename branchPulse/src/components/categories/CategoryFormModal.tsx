import React, { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";
import type { CategoryType } from "../../lib/types";
import { fetchData } from "../../lib/utils";

type CategoryFormModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedCategory: CategoryType | null;
  isEdit: boolean;
};

const CategoryFormModal = ({
  isModalOpen,
  isCloseModal,
  selectedCategory,
  isEdit,
}: CategoryFormModalProps) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categories } = useQuery<CategoryType[]>({
    queryKey: ["categories"],
    queryFn: async (context) => {
      const data = await fetchData(`${import.meta.env.VITE_API_URL}/categories`)(context);
      return data.filter((item: any) => item.id !== "all");
    },
    enabled: isModalOpen,
  });

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parentId: "",
    status: "active",
  });

  useEffect(() => {
    if (isEdit && selectedCategory) {
      setFormData({
        name: selectedCategory.name,
        slug: selectedCategory.slug || "",
        parentId: selectedCategory.parentId ? String(selectedCategory.parentId) : "",
        status: selectedCategory.status,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        parentId: "",
        status: "active",
      });
    }
  }, [isEdit, selectedCategory, isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/categories/${selectedCategory?.id}`
        : `${import.meta.env.VITE_API_URL}/categories`;

      const method = isEdit ? "PUT" : "POST";

      const payload = {
        name: formData.name,
        slug: formData.slug,
        status: formData.status,
        parentId: formData.parentId ? parseInt(formData.parentId) : null,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      toast.success(
        isEdit ? "Category updated successfully" : "Category created successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      isCloseModal();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={isEdit ? "Edit Category" : "Add New Category"}
      width="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Electronics"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug (Optional)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g. electronics"
          />
          <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parent Category (Optional)
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            value={formData.parentId}
            onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
          >
            <option value="">None (Top Level)</option>
            {categories
              ?.filter((c) => !isEdit || c.id !== selectedCategory?.id)
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
          <button
            type="button"
            onClick={isCloseModal}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {isSubmitting ? "Saving..." : "Save Category"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryFormModal;
