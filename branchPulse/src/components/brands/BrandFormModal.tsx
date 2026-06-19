import React, { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Modal from "../ui/Modal";
import type { BrandType } from "../../lib/types";

type BrandFormModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedBrand: BrandType | null;
  isEdit: boolean;
};

const BrandFormModal = ({
  isModalOpen,
  isCloseModal,
  selectedBrand,
  isEdit,
}: BrandFormModalProps) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    logoUrl: "",
    status: "active",
  });

  useEffect(() => {
    if (isEdit && selectedBrand) {
      setFormData({
        name: selectedBrand.name,
        slug: selectedBrand.slug || "",
        logoUrl: selectedBrand.logoUrl || "",
        status: selectedBrand.status,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        logoUrl: "",
        status: "active",
      });
    }
  }, [isEdit, selectedBrand, isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/brands/${selectedBrand?.id}`
        : `${import.meta.env.VITE_API_URL}/brands`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      toast.success(
        isEdit ? "Brand updated successfully" : "Brand created successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["brands"] });
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
      title={isEdit ? "Edit Brand" : "Add New Brand"}
      width="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Name *
          </label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Samsung"
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
            placeholder="e.g. samsung"
          />
          <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logo URL (Optional)
          </label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            value={formData.logoUrl}
            onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
            placeholder="https://example.com/logo.png"
          />
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
            {isSubmitting ? "Saving..." : "Save Brand"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BrandFormModal;
