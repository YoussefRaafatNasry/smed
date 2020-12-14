import React from "react";
import ReactApexChart from "react-apexcharts";
import { Task } from "../models/Task";

interface TaskTimelineProps {
  tasks: Task[];
}

export const TaskTimeline: React.FC<TaskTimelineProps> = ({ tasks }) => {
  var series = [
    {
      data: tasks.map((t) => ({
        x: `(${t.id}) ${t.name}`,
        y: [t.start, t.end],
      })),
    },
  ];

  const options = {
    xaxis: { type: "datetime" },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
      },
    },
    tooltip: {
      x: { format: "HH:mm:ss" },
    },
  };

  return (
    <ReactApexChart
      type="rangeBar"
      height={series[0].data.length * 25}
      series={series}
      options={options}
    />
  );
};
