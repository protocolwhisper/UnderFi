"use client"

import { ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart, CartesianGrid, Line, LineChart } from "recharts";

type ChartProps = {
  type: "line" | "bar";
  data: Record<string, string | number>[];
  series: {
    dataKey: string;
    color: string;
  }[];
};

export default function DynamicCharts({ type, data, series }: ChartProps) {
  const tooltipStyle = {
    contentStyle: { 
      backgroundColor: "hsl(var(--card))", 
      borderColor: "hsl(var(--border))",
      borderRadius: "8px" 
    },
    itemStyle: { color: "hsl(var(--foreground))" },
    labelStyle: { color: "hsl(var(--foreground))" }
  };

  const axisStyle = {
    stroke: "hsl(var(--muted-foreground))",
    tickLine: false,
    axisLine: false,
    fontSize: 12
  };

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="name" {...axisStyle} />
          <YAxis {...axisStyle} />
          <Tooltip {...tooltipStyle} />
          {series.map((item, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={item.dataKey}
              stroke={item.color}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="name" {...axisStyle} />
          <YAxis {...axisStyle} />
          <Tooltip {...tooltipStyle} />
          {series.map((item, index) => (
            <Bar
              key={index}
              dataKey={item.dataKey}
              fill={item.color}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return null;
} 