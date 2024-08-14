import { contextBridge, ipcRenderer } from "electron";
import { WindowAction } from "./type";

contextBridge.exposeInMainWorld("electron", {
  windowControl: (action: WindowAction) =>
    ipcRenderer.send("window-control", action),
});
