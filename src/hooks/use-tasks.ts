import { registerSnapshotTask } from "@/tasks/snapshot-task";
import { useEffect } from "react";

export function useTasks() {
  useEffect(() => {
    registerSnapshotTask();
  }, []);
}
