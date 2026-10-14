import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", uv: 590, pv: 800, amt: 1400, cnt: 490 },
  { name: "Page B", uv: 868, pv: 967, amt: 1506, cnt: 590 },
  { name: "Page C", uv: 1397, pv: 1098, amt: 989, cnt: 350 },
  { name: "Page D", uv: 1480, pv: 1200, amt: 1228, cnt: 480 },
  { name: "Page E", uv: 1520, pv: 1108, amt: 1100, cnt: 460 },
  { name: "Page F", uv: 1400, pv: 680, amt: 1700, cnt: 380 },
];

export default function LineBarAreaChart() {
  return (
    <div className="w-full max-w-[500px] h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, bottom: 5, left: 0 }}
        >
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

          <XAxis dataKey="name" tick={{ fontSize: 10 }} />

          <YAxis width={35} tick={{ fontSize: 10 }} />

          <Tooltip />
          <Legend wrapperStyle={{ fontSize: "11px" }} />

          <Area
            type="monotone"
            dataKey="amt"
            fill="#8884d8"
            stroke="#8884d8"
            fillOpacity={0.2}
          />

          <Bar dataKey="pv" barSize={16} fill="#82ca9d" />

          <Line
            type="monotone"
            dataKey="uv"
            stroke="#0088FE"
            strokeWidth={2}
            dot={false}
          />

          <Scatter dataKey="cnt" fill="#FF8042" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
