import {
  Building2,
  Check,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import Modal from "../ui/Modal";
import { useForm } from "../../hooks/useForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../../lib/utils";
import { toast } from "react-toastify";
import type { UserType } from "../../lib/types";
import { useEffect } from "react";

type UsersFormModalProps = {
  isModalOpen: boolean;
  isCloseModal: () => void;
  mode: string;
  selectedUser: UserType | null;
};

type BranchOptionData = {
  id: number;
  branchName: string;
}[];

type FormData = {
  branchId: number;
  name: string;
  email: string;
  contact: string;
  username: string;
  password: string;
  confirmPassword: string;
  status: string;
  role: string;
};

const UsersFormModal = ({
  isModalOpen,
  isCloseModal,
  mode,
  selectedUser,
}: UsersFormModalProps) => {
  const queryClient = useQueryClient();
  const { formData, handleChange, setField } = useForm({
    branchId: 0,
    name: "",
    email: "",
    contact: "",
    username: "",
    password: "",
    confirmPassword: "",
    status: "",
    role: "",
  });

  const isEdit = mode === "edit";

  useEffect(() => {
    if (isEdit && selectedUser) {
      setField("branchId", selectedUser.branchId || 0);
      setField("name", selectedUser.name || "");
      setField("email", selectedUser.email || "");
      setField("contact", selectedUser.contact || "");
      setField("username", selectedUser.username || "");
      setField("status", selectedUser.status || "");
      setField("role", selectedUser.role || "");
    }
  }, [mode, selectedUser]);

  const { data: branches } = useQuery<BranchOptionData>({
    queryKey: ["branch-options-data"],
    queryFn: fetchData(`http://localhost:5001/api/branches-options`),
  });

  const productMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      let response;

      if (isEdit) {
        response = await fetch(
          `http://localhost:5001/api/users/${selectedUser?.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          },
        );
      } else {
        response = await fetch("http://localhost:5001/api/users", {
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

      queryClient.invalidateQueries({ queryKey: ["users-data"] });
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
      title={isEdit ? "Edit User" : "Add New User"}
      width="max-w-xl"
    >
      <form onSubmit={handleSubmitForm} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Username
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. johndoe"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. johndoe@email.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Contact
            </label>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="e.g. 09123456789"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Role
            </label>

            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />

              <select
                value={formData.role}
                onChange={(e) => setField("role", e.target.value)}
                className="w-full bg-white pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="staff">Staff</option>
                <option value="branch_manager">Branch Manager</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Assigned Branch
            </label>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />

              <select
                value={formData.branchId}
                onChange={(e) => setField("branchId", e.target.value)}
                className="w-full bg-white pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Branch</option>
                {branches?.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Status
            </label>

            <div className="relative">
              <Check className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />

              <select
                value={formData.status}
                onChange={(e) => setField("status", e.target.value)}
                className="w-full bg-white pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {mode !== "edit" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={isCloseModal}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-medium hover transition-colors"
          >
            Cancel
          </button>

          <button className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            {isEdit ? "Edit User" : "Create User"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UsersFormModal;
