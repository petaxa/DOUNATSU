import type { WindowAction } from "@/electron/type";

export {};

declare global {
  interface Window {
    electron: {
      windowControl: (action: WindowAction) => void;
    };
  }
}
