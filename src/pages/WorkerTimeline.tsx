import { Box } from "@chakra-ui/react";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { CategoriesTags } from "../components/CategoriesTags";
import { Task } from "../models/Task";
import { getColorsMap } from "../util/getColorsMap";
import { groupBy } from "../util/groupBy";

interface WorkerTimelineProps {
  tasks: Task[];
}

export const WorkerTimeline: React.FC<WorkerTimelineProps> = ({ tasks }) => {
  const categories = Array.from(new Set<string>(tasks.map((t) => t.category)));
  const colorsMap = getColorsMap(categories);

  const groups = groupBy(tasks, "name");

  const series = Array.from(groups, ([name, tasks]) => ({
    name,
    data: tasks.map((t) => ({
      x: t.worker,
      y: [t.start, t.end],
      fillColor: colorsMap.get(t.category),
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
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  return (
    <Box>
      <CategoriesTags colorsMap={colorsMap} />
      <ReactApexChart
        height={640}
        type="rangeBar"
        series={series}
        options={options}
      />
    </Box>
  );
};
