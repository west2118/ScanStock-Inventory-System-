import { X } from "lucide-react";
import { useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
};

const Modal = ({
  isModalOpen,
  isCloseModal,
  title,
  children,
  width = "max-w-md",
}: ModalProps) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  // ⭐ Prevent rendering when closed
  if (!isModalOpen) return null;

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow-lg w-full ${width} max-h-[90vh] overflow-y-auto scrollbar-hide`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            </div>

            <button
              onClick={isCloseModal}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
