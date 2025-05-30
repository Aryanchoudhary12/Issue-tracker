"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { ChartContainer,ChartConfig,ChartLegend} from "./chart";
import { Bar, BarChart, CartesianGrid,XAxis,YAxis } from "recharts";


interface Props{
    open: number;
    inProgress: number;
    closed: number;
}
const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { name: "Open", value: open },
    { name: "In Progress", value: inProgress },
    { name: "Closed", value: closed },
  ];
  const chartConfig = {
  open: {
    label: "Open",
    color: "#2563eb",
  },
  inProgress: {
    label: "In Progress",
    color: "#71c0bb",
  },
    closed: {
        label: "Closed",
        color: "#22c55e",
    },
} satisfies ChartConfig

  return (

      <ChartContainer config={chartConfig} className="min-h-[200px] sm:w-11/12 lg:w-8/12 mb-6">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartLegend />
            <Bar dataKey="value" fill="var(--color-primary)" radius={2} />
            <Bar dataKey="open" fill="var(--color-open)" radius={2} />
            <Bar dataKey="inProgress" fill="var(--color-secondary)" radius={4} />
            <Bar dataKey="closed" fill="var(--color-closed)" radius={4} />
        </BarChart>
      </ChartContainer>
  );
};

export default IssueChart;
