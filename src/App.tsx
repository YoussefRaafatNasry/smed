import React from "react";
import Chart from "react-google-charts";
import { CSVReader } from "react-papaparse";

interface Record {
  data: string[];
}

interface Task {
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

export default class App extends React.Component<{}, { tasks: Task[] }> {
  handleOnDrop = (records: Record[]) => {
    records.shift(); // remove header

    console.log(records);
    const tasks = records
      .filter((r) => r.data.length > 1)
      .map(
        (r): Task => ({
          name: r.data[1],
          start: strToDate(r.data[3]),
          end: strToDate(r.data[4]),
        })
      );

    this.setState({ tasks });
  };

  handleOnError = (err: any, _: any, __: any, ___: any) => {
    console.log(err);
  };

  render() {
    return (
      <div style={{ padding: "2vh" }}>
        {!this.state?.tasks ? (
          <CSVReader
            addRemoveButton
            onDrop={this.handleOnDrop}
            onError={this.handleOnError}
          >
            <span>Drop CSV file here.</span>
          </CSVReader>
        ) : (
          <Chart
            width={"100%"}
            height={"96vh"}
            chartType="Timeline"
            loader={<div>Loading Chart</div>}
            data={[
              [
                { type: "string", id: "Name" },
                { type: "date", id: "Start" },
                { type: "date", id: "End" },
              ],
              ...this.state.tasks.map((t) => [t.name, t.start, t.end]),
            ]}
          />
        )}
      </div>
    );
  }
}
