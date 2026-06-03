import { Users, Crown, UserCog } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { SummaryStatType, UserSummaryStatsType } from "../../lib/types";
import { fetchData } from "../../lib/utils";
import StatsCards from "../StatsCards";

const UserStatsSection = () => {
  const { data } = useSuspenseQuery<UserSummaryStatsType>({
    queryKey: ["users-stats"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/users-stats`),
    staleTime: 1000 * 60 * 5,
  });

  const summaryStats: SummaryStatType[] = useMemo(
    () => [
      {
        title: "Total Users",
        value: data?.totalUsers ?? 0,
        subtitle: `Active: ${data?.activeUsers ?? 0} • Unassigned ${data?.unassigned ?? 0}`,
        subtitleColor: "text-gray-400",
        icon: Users,
        iconColor: "text-blue-600",
        bgColor: "bg-blue-100",
      },
      {
        title: "Administrators",
        value: (data?.centralAdmins ?? 0) + (data?.admins ?? 0),
        subtitle: `Central Admins: ${data?.centralAdmins ?? 0} • Admins ${data?.admins ?? 0}`,
        subtitleColor: "text-gray-400",
        icon: Crown,
        iconColor: "text-purple-600",
        bgColor: "bg-purple-100",
      },
      {
        title: "Branch Managers",
        value: data?.branchManagers ?? 0,
        subtitle: "Manage assigned branches",
        subtitleColor: "text-gray-400",
        icon: UserCog,
        iconColor: "text-green-600",
        bgColor: "bg-green-100",
      },
      {
        title: "Staff",
        value: (data?.inventoryStaff ?? 0) + (data?.cashiers ?? 0),
        subtitle: `Inventory Staff: ${data?.inventoryStaff ?? 0} • Cashiers ${data?.cashiers ?? 0}`,
        subtitleColor: "text-gray-400",
        icon: Users,
        iconColor: "text-orange-600",
        bgColor: "bg-orange-100",
      },
    ],
    [data],
  );

  return <StatsCards summaryStats={summaryStats} />;
};

export default UserStatsSection;
