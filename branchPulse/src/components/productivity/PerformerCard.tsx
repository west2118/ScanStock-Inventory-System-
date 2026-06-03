import { capitalizeFirst, pesoFormatter } from "../../lib/utils";

const PerformerCard = ({
  emp,
  idx,
}: {
  emp: {
    id: number;
    branch: string;
    name: string;
    productivity: string;
    role: string;
    value: number;
  };
  idx: number;
}) => {
  return (
    <div
      key={emp.id}
      className="flex items-center justify-between bg-white/10 rounded-xl p-3 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
          {idx + 1}
        </div>
        <div>
          <p className="font-semibold">{emp.name}</p>
          <p className="text-xs text-red-100">
            {emp.branch} •{" "}
            {emp.role
              .replace("_", " ")
              .split(" ")
              .map((l: string) => capitalizeFirst(l))
              .join(" ")}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold">{emp.productivity}%</p>
        <p className="text-xs text-red-100">
          {pesoFormatter.format(emp.value)}
        </p>
      </div>
    </div>
  );
};

export default PerformerCard;
