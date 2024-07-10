import { app as o, BrowserWindow as n } from "electron";
let e;
const t = () => {
  e = new n(), process.env.VITE_DEV_SERVER_URL && (e.loadURL(process.env.VITE_DEV_SERVER_URL), e.webContents.openDevTools());
};
o.on("window-all-closed", () => {
  process.platform !== "darwin" && (o.quit(), e = null);
});
o.on("activate", () => {
  n.getAllWindows().length === 0 && t();
});
o.whenReady().then(() => {
  t();
});
