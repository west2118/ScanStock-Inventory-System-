import { Crown, Medal } from "lucide-react";
import { formatPesoShort } from "../../lib/utils";

type PodiumCardProps = {
  place: 1 | 2 | 3;
  name: string;
  sales: number;
  productivity: number;
};

const PodiumCard = ({ place, name, sales, productivity }: PodiumCardProps) => {
  const config = {
    1: {
      circle: "w-32 h-32 bg-yellow-500 ring-4 ring-yellow-300",
      badge: "w-10 h-10 bg-yellow-500 text-lg border-2 border-white",
      title: "text-2xl text-yellow-400",
      icon: <Crown className="w-16 h-16 text-white" />,
      container: "md:scale-110",
    },
    2: {
      circle: "w-24 h-24 bg-gray-300",
      badge: "w-8 h-8 bg-gray-400",
      title: "text-xl text-white",
      icon: <Medal className="w-12 h-12 text-gray-500" />,
      container: "",
    },
    3: {
      circle: "w-24 h-24 bg-orange-300",
      badge: "w-8 h-8 bg-orange-500",
      title: "text-xl text-white",
      icon: <Medal className="w-12 h-12 text-orange-600" />,
      container: "",
    },
  }[place];

  return (
    <div className={`text-center ${config.container}`}>
      <div className="relative flex justify-center">
        <div
          className={`${config.circle} rounded-full flex items-center justify-center mb-3 shadow-xl`}
        >
          {config.icon}
        </div>

        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full flex items-center justify-center font-bold text-white ${config.badge}`}
        >
          {place}
        </div>
      </div>

      <h4 className={`font-bold ${config.title}`}>{name}</h4>

      <div className="mt-2 flex justify-center gap-4 text-sm">
        <span>{formatPesoShort(sales)} sales</span>
        <span>{productivity}% productivity</span>
      </div>
    </div>
  );
};

export default PodiumCard;
