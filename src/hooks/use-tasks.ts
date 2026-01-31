import { registerBalanceSnapshotTask } from "@/tasks/balance-snapshot-task";
import { useEffect } from "react";

export function useTasks() {
  useEffect(() => {
    registerBalanceSnapshotTask();
  }, []);
}
