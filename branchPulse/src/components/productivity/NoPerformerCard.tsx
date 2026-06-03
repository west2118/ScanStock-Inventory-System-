import { Crown, TrendingDown } from "lucide-react";

type NoPerformerCardProps = {
  type?: "top" | "bottom";
};

const NoPerformerCard = ({ type = "top" }: NoPerformerCardProps) => {
  const isTop = type === "top";

  return (
    <div className="flex flex-col items-center justify-center bg-white/10 rounded-xl p-8 backdrop-blur-sm">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
        {isTop ? (
          <Crown className="w-8 h-8 text-white/50" />
        ) : (
          <TrendingDown className="w-8 h-8 text-white/50" />
        )}
      </div>

      <p className="font-medium text-white/80">
        No {isTop ? "Top" : "Bottom"} Performer Data
      </p>

      <p className="text-xs text-white/60 mt-1 text-center">
        No employee meets the {isTop ? "top performer" : "bottom performer"}{" "}
        criteria
      </p>
    </div>
  );
};

export default NoPerformerCard;
