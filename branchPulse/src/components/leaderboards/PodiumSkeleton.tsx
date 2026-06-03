import { Crown, Medal, Trophy } from "lucide-react";

// Podium Card Skeleton
const PodiumCardSkeleton = ({ place }: { place: 1 | 2 | 3 }) => {
  const config = {
    1: {
      circle: "w-32 h-32 bg-gray-300 ring-4 ring-gray-200",
      badge: "w-10 h-10 bg-gray-400",
      title: "h-7 bg-gray-300 rounded w-32",
      icon: <Crown className="w-16 h-16 text-gray-400" />,
      container: "md:scale-110",
    },
    2: {
      circle: "w-24 h-24 bg-gray-300",
      badge: "w-8 h-8 bg-gray-400",
      title: "h-6 bg-gray-300 rounded w-24",
      icon: <Medal className="w-12 h-12 text-gray-400" />,
      container: "",
    },
    3: {
      circle: "w-24 h-24 bg-gray-300",
      badge: "w-8 h-8 bg-gray-400",
      title: "h-6 bg-gray-300 rounded w-24",
      icon: <Medal className="w-12 h-12 text-gray-400" />,
      container: "",
    },
  }[place];

  return (
    <div className={`text-center animate-pulse ${config.container}`}>
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
      <div className={`${config.title} mx-auto`}></div>
      <div className="mt-2 flex justify-center gap-4">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>
    </div>
  );
};

// Main Top Performing Branches Skeleton
const TopPerformingBranchesSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl py-8 px-6 mb-6 animate-pulse">
      <div className="flex items-center justify-center gap-2 mb-10">
        <div className="h-7 bg-gray-300 rounded w-56"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <PodiumCardSkeleton place={2} />
        <PodiumCardSkeleton place={1} />
        <PodiumCardSkeleton place={3} />
      </div>
    </div>
  );
};

export default TopPerformingBranchesSkeleton;
