import React from "react";
import { CSVReader } from "react-papaparse";
import ReactApexChart from "react-apexcharts";

interface Record {
  data: string[];
}

interface Task {
  worker: string;
  name: string;
  start: Date;
  end: Date;
}

const strToDate = (str: string): Date => {
  var arr = str.split(":");
  var hrs = Number(arr[0]);
  var mns = Number(arr[1]);
  var sec = Number(arr[2]);

  return new Date(0, 0, 0, hrs, mns, sec);
};

const tasksToSeries = (tasks: Task[]) => {
  const groups = tasks.reduce((acc: { [key: string]: Task[] }, task) => {
    acc[task.name] = [...(acc[task.name] || []), task];
    return acc;
  }, {});

  var series = Object.keys(groups).map((key) => ({
    name: key,
    data: groups[key].map((t) => ({
      x: t.worker.toString(),
      y: [t.start.getTime(), t.end.getTime()],
    })),
  }));

  return series.sort((a, b) => ("" + a.name).localeCompare(b.name));
};
export default class App extends React.Component<{}, { tasks: Task[] }> {
  options = {
    chart: {
      height: 1000,
      type: "rangeBar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
        rangeBarGroupRows: true,
      },
    },
    fill: { type: "solid" },
    xaxis: {
      type: "datetime",
      labels: { format: "HH:mm:ss" },
    },
    legend: { position: "right" },
    tooltip: {
      x: { format: "HH:mm:ss" },
    },
  };

  handleOnDrop = (records: Record[]) => {
    records.shift(); // remove header

    const tasks = records
      .filter((r) => r.data.length > 1)
      .map(
        (r): Task => ({
          worker: r.data[0],
          name: r.data[2],
          start: strToDate(r.data[4]),
          end: strToDate(r.data[5]),
        })
      );

    this.setState({ tasks });
  };

  render() {
    return (
      <div>
        {!this.state?.tasks ? (
          <CSVReader addRemoveButton onDrop={this.handleOnDrop}>
            <span>Drop CSV file here.</span>
          </CSVReader>
        ) : (
          <ReactApexChart
            options={this.options}
            series={tasksToSeries(this.state.tasks)}
            type="rangeBar"
            height={700}
          />
        )}
      </div>
    );
  }
}
