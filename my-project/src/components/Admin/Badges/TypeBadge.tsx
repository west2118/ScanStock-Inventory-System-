import { MinusCircle, PlusCircle } from "lucide-react";

const TypeBadge = (type: "IN" | "OUT") => {
  if (type === "IN") {
    return {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <PlusCircle className="w-3 h-3" />,
      label: "Stock In",
    };
  }

  return {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: <MinusCircle className="w-3 h-3" />,
    label: "Stock Out",
  };
};

export default TypeBadge;
