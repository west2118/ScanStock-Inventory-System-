import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";

const TrendBadge = ({ growth }) => (
  <span
    className={`inline-flex items-center gap-1 text-xs font-medium ${
      growth >= 0 ? "text-green-600" : "text-red-600"
    }`}
  >
    {growth >= 0 ? (
      <ArrowUp className="w-3 h-3" />
    ) : (
      <ArrowDown className="w-3 h-3" />
    )}
    {Math.abs(growth)}%
  </span>
);

export default TrendBadge;
