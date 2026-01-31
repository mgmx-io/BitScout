import { getHistoricalPrice } from "@/api/endpoints";
import { useAppStore } from "@/stores";
import { useSnapshotStore } from "@/stores/snapshot";
import { fetchWalletBalance } from "@/utils";
import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";

const TASK_NAME = "snapshot-task";

// Define the task
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    console.log("[BackgroundTask] Starting balance snapshot task");

    // Read app state from store
    const { addresses, selectedId } = useAppStore.getState();
    if (!addresses || addresses.length === 0) {
      console.log("[BackgroundTask] No addresses to fetch");
      return BackgroundTask.BackgroundTaskResult.Success;
    }

    // Filter addresses for the selected wallet
    const selectedWalletAddresses = addresses
      .filter((addr) => addr.walletId === selectedId)
      .map((addr) => addr.address);

    if (selectedWalletAddresses.length === 0) {
      console.log("[BackgroundTask] No addresses for selected wallet");
      return BackgroundTask.BackgroundTaskResult.Success;
    }

    // Fetch balance for selected wallet
    const balance = await fetchWalletBalance(selectedWalletAddresses);

    // Fetch historical price data
    const timestamp = Math.floor(Date.now() / 1000);
    const { prices, exchangeRates } = await getHistoricalPrice({ timestamp });

    // Save snapshot with price data
    useSnapshotStore.getState().addSnapshot({
      balance,
      prices: prices[0],
      rates: exchangeRates,
    });

    console.log(
      `[BackgroundTask] Successfully saved snapshot for wallet ${selectedId}: ${balance} sats`,
    );
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error("[BackgroundTask] Failed:", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export async function registerSnapshotTask() {
  const status = await BackgroundTask.getStatusAsync();
  if (status !== BackgroundTask.BackgroundTaskStatus.Available) {
    console.warn("Background tasks not available:", status);
    return;
  }

  await BackgroundTask.registerTaskAsync(TASK_NAME);

  console.log("Balance snapshot task registered");
}

export async function unregisterSnapshotTask() {
  await BackgroundTask.unregisterTaskAsync(TASK_NAME);
  console.log("Balance snapshot task unregistered");
}
