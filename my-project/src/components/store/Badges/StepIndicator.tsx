import { CheckCircle } from "lucide-react";

const StepIndicator = ({
  step,
  title,
  status,
}: {
  step: number;
  title: string;
  status: string;
}) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
            ${
              status === "completed"
                ? "bg-green-600 text-white"
                : status === "current"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-400"
            }
          `}
        >
          {status === "completed" ? <CheckCircle className="w-5 h-5" /> : step}
        </div>
        <span
          className={`
            text-xs mt-2 whitespace-nowrap
            ${status === "current" ? "text-gray-900 font-medium" : "text-gray-400"}
          `}
        >
          {title}
        </span>
      </div>
      {step < 4 && (
        <div
          className={`
            w-16 h-px mx-2
            ${status === "completed" ? "bg-green-600" : "bg-gray-200"}
          `}
        />
      )}
    </div>
  );
};

export default StepIndicator;
