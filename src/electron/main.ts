import { app, BrowserWindow, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import * as path from "path";
import * as dotenv from "dotenv";
import { WindowAction } from "./type";

// .envファイルを読み込む
dotenv.config();

let mainWindow: BrowserWindow | null;

function createWindow() {
  console.log("Creating Electron Window...");

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 880,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
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
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
    console.log("Lunch Mode: BUILD");

    // アプリケーションが準備完了したら、更新を確認
    autoUpdater.checkForUpdatesAndNotify();
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

// アップデート関連のイベントハンドリング
autoUpdater.on("checking-for-update", () => {
  console.log("Checking for update...");
});

autoUpdater.on("update-available", (info) => {
  console.log("Update available.");
});

autoUpdater.on("update-not-available", (info) => {
  console.log("Update not available.");
});

autoUpdater.on("error", (err) => {
  console.error("Error in auto-updater. " + err);
});

autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  console.log(log_message);
});

autoUpdater.on("update-downloaded", (info) => {
  console.log("Update downloaded");
});
