import { Box } from "@chakra-ui/react";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { CategoriesTags } from "../components/CategoriesTags";
import { Task } from "../models/Task";
import { getColorsMap } from "../util/getColorsMap";

interface TaskTimelineProps {
  tasks: Task[];
}

export const TaskTimeline: React.FC<TaskTimelineProps> = ({ tasks }) => {
  const categories = Array.from(new Set<string>(tasks.map((t) => t.category)));
  const colorsMap = getColorsMap(categories);

  const series = [
    {
      data: tasks.map((t) => ({
        x: `(${t.worker}-${t.id}) ${t.name}`,
        y: [t.start, t.end],
        fillColor: colorsMap.get(t.category),
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
        type="rangeBar"
        height={series[0].data.length * 25}
        series={series}
        options={options}
      />
    </Box>
  );
};
