import { Loader2 } from "lucide-react";

const ModalLoading = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-sm text-gray-500">Loading {title}...</p>
      </div>
    </div>
  );
};

export default ModalLoading;
