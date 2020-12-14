import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Record } from "./models/Record";
import { Task } from "./models/Task";
import { Dashboard } from "./pages/Dashboard";
import { TaskTimeline } from "./pages/TaskTimeline";
import { WorkerTimeline } from "./pages/WorkerTimeline";
import { strToDate } from "./util/strToDate";

export const App: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);

  const handleOnDrop = (records: Record[]) => {
    records.shift(); // remove header

    setTasks(
      records
        .filter((r) => r.data.length > 1)
        .map(
          (r): Task => ({
            worker: r.data[0],
            name: r.data[2],
            start: strToDate(r.data[4]),
            end: strToDate(r.data[5]),
          })
        )
    );
  };

  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/task">
            <TaskTimeline tasks={tasks} />
          </Route>
          <Route path="/worker">
            <WorkerTimeline tasks={tasks} />
          </Route>
          <Route path="/">
            <Dashboard handleOnDrop={handleOnDrop} />
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
};
