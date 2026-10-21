import { useCallback, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

const impressionsData = [
  { year: 2017, impression: 100, patients: 80 },
  { year: 2018, impression: 120, patients: 100 },
  { year: 2019, impression: 150, patients: 130 },
  { year: 2020, impression: 180, patients: 160 },
  { year: 2021, impression: 200, patients: 190 },
  { year: 2022, impression: 499, patients: 350 },
];

const initialState = {
  left: 2017,
  right: 2022,
  refAreaLeft: undefined,
  refAreaRight: undefined,
  top: 550,
  bottom: 0,
};

export default function HighlightAndZoomLineChart() {
  const [zoomGraph, setZoomGraph] = useState(initialState);

  const zoom = useCallback(() => {
    setZoomGraph((prev) => {
      let { refAreaLeft, refAreaRight } = prev;

      if (
        refAreaLeft == null ||
        refAreaRight == null ||
        refAreaLeft === refAreaRight
      ) {
        return {
          ...prev,
          refAreaLeft: undefined,
          refAreaRight: undefined,
        };
      }

      if (refAreaLeft > refAreaRight) {
        [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
      }

      const selectedData = impressionsData.filter(
        (item) => item.year >= refAreaLeft && item.year <= refAreaRight,
      );

      if (!selectedData.length) {
        return {
          ...prev,
          refAreaLeft: undefined,
          refAreaRight: undefined,
        };
      }

      const values = selectedData.flatMap((item) => [
        item.impression,
        item.patients,
      ]);

      return {
        ...prev,
        left: refAreaLeft,
        right: refAreaRight,
        bottom: Math.max(0, Math.floor(Math.min(...values) - 20)),
        top: Math.ceil(Math.max(...values) + 20),
        refAreaLeft: undefined,
        refAreaRight: undefined,
      };
    });
  }, []);

  const zoomOut = useCallback(() => {
    setZoomGraph(initialState);
  }, []);

  const onMouseDown = useCallback((e) => {
    if (e?.activeLabel == null) return;

    setZoomGraph((prev) => ({
      ...prev,
      refAreaLeft: Number(e.activeLabel),
      refAreaRight: undefined,
    }));
  }, []);

  const onMouseMove = useCallback((e) => {
    if (e?.activeLabel == null) return;

    setZoomGraph((prev) =>
      prev.refAreaLeft == null
        ? prev
        : {
            ...prev,
            refAreaRight: Number(e.activeLabel),
          },
    );
  }, []);

  const { left, right, top, bottom, refAreaLeft, refAreaRight } = zoomGraph;

  return (
    <div className="w-full select-none">
      <ResponsiveContainer width="100%" aspect={1.618} maxHeight={490}>
        <LineChart
          data={impressionsData}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={zoom}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="year"
            type="number"
            domain={[left, right]}
            allowDataOverflow
          />

          <YAxis
            type="number"
            domain={[bottom, top]}
            allowDataOverflow
            width="auto"
          />

          <Tooltip />

          {/* Blue line */}
          <Line
            type="natural"
            dataKey="impression"
            name="Impressions"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
            animationDuration={300}
          />

          {/* Green line */}
          <Line
            type="natural"
            dataKey="patients"
            name="Patients"
            stroke="#34d399"
            strokeWidth={2}
            dot={false}
            animationDuration={300}
          />

          {refAreaLeft != null && refAreaRight != null ? (
            <ReferenceArea
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
              stroke="var(--color-border-2)"
              fill="var(--color-solid-7a)"
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
