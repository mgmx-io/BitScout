import { createMMKV } from "react-native-mmkv";

export const mmkvInstance = createMMKV();

export const mmkvStorage = {
  getItem: (key: string) => {
    return mmkvInstance.getString(key) ?? null;
  },
  setItem: (key: string, value: string) => {
    return mmkvInstance.set(key, value);
  },
  removeItem: (key: string): void => {
    mmkvInstance.remove(key);
  },
};
