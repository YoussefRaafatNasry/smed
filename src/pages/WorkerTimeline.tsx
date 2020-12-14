import React from "react";
import ReactApexChart from "react-apexcharts";
import { Task } from "../models/Task";
import { groupBy } from "../util/groupBy";

interface WorkerTimelineProps {
  tasks: Task[];
}

export const WorkerTimeline: React.FC<WorkerTimelineProps> = ({ tasks }) => {
  const groups = groupBy(tasks, "name");

  var series = Array.from(groups, ([name, tasks]) => ({
    name,
    data: tasks.map((t) => ({
      x: t.worker.toString(),
      y: [t.start, t.end],
    })),
  })).sort((a, b) => a.name.localeCompare(b.name));

  const options = {
    xaxis: { type: "datetime" },
    legend: { position: "right" },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
        rangeBarGroupRows: true,
      },
    },
    tooltip: {
      x: { format: "HH:mm:ss" },
    },
  };

  return (
    <ReactApexChart
      height={700}
      type="rangeBar"
      series={series}
      options={options}
    />
  );
};
