import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { label: "Jan", x: 12, y: 240 },
  { label: "Feb", x: 30, y: 450 },
  { label: "Mar", x: 50, y: 350 },
  { label: "Apr", x: 80, y: 400 },
  { label: "May", x: 150, y: 300 },
  { label: "Jun", x: 80, y: 500 },
];

export default function SimpleBarChart() {
  return (
    <div className="w-full max-w-[700px]">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

          <XAxis dataKey="label" stroke="#a1a1aa" />

          <YAxis width="auto" stroke="#a1a1aa" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: "10px",
              color: "#fff",
            }}
          />

          <Legend />

          <Bar
            dataKey="x"
            name="Patient"
            fill="#60a5fa"
            radius={[10, 10, 0, 0]}
          />

          <Bar dataKey="y" name="room" fill="#34d399" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
