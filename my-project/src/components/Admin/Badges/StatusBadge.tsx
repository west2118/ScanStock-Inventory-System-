import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";

const StatusBadge = (
  status: "pending" | "approved" | "rejected" | "voided",
) => {
  switch (status) {
    case "approved":
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: <CheckCircle className="w-3 h-3" />,
        label: "Approved",
      };

    case "pending":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: <Clock className="w-3 h-3" />,
        label: "Pending",
      };

    case "rejected":
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: <XCircle className="w-3 h-3" />,
        label: "Rejected",
      };

    case "voided":
      return {
        bg: "bg-gray-100",
        text: "text-gray-700",
        icon: <AlertCircle className="w-3 h-3" />,
        label: "Voided",
      };

    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-700",
        icon: <AlertCircle className="w-3 h-3" />,
        label: status,
      };
  }
};

export default StatusBadge;
