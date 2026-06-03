import { toast } from "react-toastify";
import { useForm } from "../../hooks/useForm";
import Modal from "../ui/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type BranchFormModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  mode: "edit" | "create";
};

type FormData = {
  branchName: string;
  branchCode: string;
  region: string;
  location: string;
  status: string;
};

const BranchFormModal = ({
  isModalOpen,
  isCloseModal,
  mode,
}: BranchFormModalProps) => {
  const queryClient = useQueryClient();
  const { formData, handleChange } = useForm({
    branchName: "",
    branchCode: "",
    region: "",
    location: "",
    status: "",
  });

  const productMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let response;

      if (mode === "edit") {
        // if (!selectedProduct) return;

        response = await fetch(`http://localhost:5001/api/product/1`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch("http://localhost:5001/api/branches", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Create Product Failed");
      }

      return data;
    },

    onSuccess: (response: any) => {
      isCloseModal();
      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["branches-data"] });
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
      title={mode === "edit" ? "Edit Branch" : "Create Branch"}
    >
      <form onSubmit={handleSubmitForm}>
        <div className="space-y-4">
          {/* Branch Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch Name
            </label>

            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Manila Central"
            />
          </div>

          {/* Branch Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch Code
            </label>

            <input
              type="text"
              name="branchCode"
              value={formData.branchCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., BR-ROCE-123"
            />
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>

            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Region</option>
              <option value="Metro Manila">Metro Manila</option>
              <option value="Visayas">Visayas</option>
              <option value="Mindanao">Mindanao</option>
              <option value="Luzon">Luzon</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Full address"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={isCloseModal}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover transition-colors"
          >
            Cancel
          </button>

          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {mode === "edit" ? "Save Changes" : "Add Branch"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BranchFormModal;
