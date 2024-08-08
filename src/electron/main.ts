import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as dotenv from "dotenv";
import { WindowAction } from "./type";

// .envファイルを読み込む
dotenv.config();

let mainWindow: BrowserWindow | null;

function createWindow() {
  console.log("Creating Electron Window...");

  mainWindow = new BrowserWindow({
    width: 1800,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "../dist/preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
    frame: false,
  });

  // Viteが開発サーバーを起動するURL
  if (process.env.NODE_ENV?.trim() === "development") {
    mainWindow.loadURL(
      `http://localhost:${process.env.DEV_SERVER_PORT?.trim()}`
    );
    mainWindow.webContents.openDevTools();
    console.log("Lunch Mode: DEV");
  } else {
    // Viteがビルドした静的ファイルをロード
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    console.log("Lunch Mode: BUILD");
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

const setWindowControl = (
  event: Electron.IpcMainEvent,
  action: WindowAction
) => {
  if (!mainWindow) {
    console.log(`No Window: ${action}`);
    return;
  }

  switch (action) {
    case "maximize":
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
      break;
    case "minimize":
      mainWindow.minimize();
      break;
    case "close":
      mainWindow.close();
      break;
  }
};

app.on("ready", () => {
  ipcMain.on("window-control", setWindowControl);
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
