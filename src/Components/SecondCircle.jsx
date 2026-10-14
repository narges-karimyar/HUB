import { Pie, PieChart, Sector, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data = [
  { name: "Group A", x: 400, fill: COLORS[0] },
  { name: "Group B", x: 300, fill: COLORS[1] },
  { name: "Group C", x: 200, fill: COLORS[2] },
  { name: "Group D", x: 100, fill: COLORS[3] },
];

const PieGradient = (props) => {
  const index = props.index ?? 0;
  const color = COLORS[index % COLORS.length];

  return (
    <>
      <defs>
        <radialGradient
          id={`fillGradient${index}`}
          cx={props.cx}
          cy={props.cy}
          r={props.outerRadius}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={color} stopOpacity={0} />
          <stop offset="100%" stopColor={color} stopOpacity={0.8} />
        </radialGradient>

        <clipPath id={`clipPath${index}`}>
          <Sector {...props} />
        </clipPath>
      </defs>

      <Sector
        {...props}
        fill={`url(#fillGradient${index})`}
        clipPath={`url(#clipPath${index})`}
        stroke="none"
      />
    </>
  );
};

export default function CircleChart({ isAnimationActive = true }) {
  return (
    <PieChart width={170} height={170}>
      <Pie
        data={data}
        dataKey="x"
        nameKey="name"
        shape={PieGradient}
        innerRadius="60%"
        outerRadius="85%"
        paddingAngle={4}
        stroke="none"
        isAnimationActive={isAnimationActive}
      />
      <Tooltip />
    </PieChart>
  );
}
