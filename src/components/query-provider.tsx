import { mmkvStorage } from "@/config/mmkv";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { PropsWithChildren } from "react";

const HOUR = 1000 * 60 * 60;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: HOUR * 24,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: mmkvStorage,
});

export function QueryProvider(props: PropsWithChildren) {
  const { children } = props;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
