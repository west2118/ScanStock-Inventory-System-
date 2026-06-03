import { capitalizeFirst, pesoFormatter } from "../../lib/utils";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg">
        <p className="font-semibold text-slate-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {capitalizeFirst(entry.name)}: {pesoFormatter.format(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
