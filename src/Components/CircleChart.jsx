import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Pink", value: 35, color: "#F00080" },
  { name: "Blue", value: 10, color: "#2455F5" },
  { name: "Yellow", value: 20, color: "#FFD333" },
  { name: "Green", value: 30, color: "#19AD43" },
  { name: "Purple", value: 5, color: "#852D91" },
];

export default function CircleChart() {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="90%"
        cornerRadius="50%"
        paddingAngle={3}
        stroke="none"
        isAnimationActive={true}
      >
        {data.map((item, index) => (
          <Cell key={index} fill={item.color} />
        ))}
      </Pie>
    </PieChart>
  );
}
