import { ArrowDown, ArrowUp } from "lucide-react";

const RankBadge = ({ rank }) => (
  <div className="flex items-center gap-1">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
        rank === 1
          ? "bg-yellow-500 text-white"
          : rank === 2
            ? "bg-gray-400 text-white"
            : rank === 3
              ? "bg-orange-600 text-white"
              : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
      }`}
    >
      {rank}
    </div>
  </div>
);

export default RankBadge;
