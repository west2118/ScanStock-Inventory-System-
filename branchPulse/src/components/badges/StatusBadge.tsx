import { CheckCircle, XCircle } from "lucide-react";

const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status === "active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isActive
          ? "bg-green-100 text-green-700 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:text-red-400"
      }`}
    >
      {isActive ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}

      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

export default StatusBadge;
