import React from "react";
import { Task } from "../models/Task";

interface WorkerTimelineProps {
  tasks: Task[];
}

export const WorkerTimeline: React.FC<WorkerTimelineProps> = () => {
  return <p>Worker</p>;
};
