import { AlertCircle, Mail } from "lucide-react";
import Modal from "../ui/Modal";

type ResetPasswordModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  selectedUser: {
    email: string;
  };
};

const ResetPasswordModal = ({
  isModalOpen,
  isCloseModal,
  selectedUser,
}: ResetPasswordModalProps) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      isCloseModal={isCloseModal}
      title="Reset Password"
      width="max-w-md"
    >
      <div className="space-y-4">
        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />

            <div>
              <p className="text-sm font-semibold text-yellow-800">
                Confirm Reset
              </p>

              <p className="text-xs text-yellow-700 mt-1 leading-relaxed">
                A password reset link will be sent to{" "}
                <span className="font-medium">{selectedUser?.email}</span>. The
                user will be required to set a new password.
              </p>
            </div>
          </div>
        </div>

        {/* Email Info */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="p-2 bg-white border border-gray-200 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">
              {selectedUser?.email}
            </p>

            <p className="text-xs text-gray-400">
              User will receive reset instructions
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={isCloseModal}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <button className="flex-1 px-4 py-2.5 bg-yellow-600 text-white rounded-xl font-medium hover:bg-yellow-700 transition-colors">
            Send Reset Link
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
