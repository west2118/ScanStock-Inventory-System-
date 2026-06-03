import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Modal from "./UI/Modal";

type DeleteModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedProductId: number | null;
  selectedProductName: string | null;
  title: string;
};

const DeleteModal = ({
  isModalOpen,
  isCloseModal,
  selectedProductId,
  selectedProductName,
  title,
}: DeleteModalProps) => {
  const queryClient = useQueryClient();

  console.log("Selected ID: ", selectedProductId);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:5001/api/product/${selectedProductId}/delete`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Delete Product Failed");
      }

      return data;
    },
    onSuccess: (response) => {
      isCloseModal();
      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["products-data"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleDeleteService = (e: any) => {
    e.preventDefault();

    deleteMutation.mutate();
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title={`Delete ${title}`}
    >
      {/* Modal Body */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-800">
              Delete this {title} ({selectedProductName})?
            </h4>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              This {title} will be permanently removed from the system. All
              related data will be lost.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          ⚠️ This action cannot be undone.
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            disabled={deleteMutation.isPending}
            onClick={isCloseModal}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            disabled={deleteMutation.isPending}
            onClick={handleDeleteService}
            className="flex-1 flex items-center justify-center px-4 py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {deleteMutation.isPending ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              <>Delete {title}</>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
