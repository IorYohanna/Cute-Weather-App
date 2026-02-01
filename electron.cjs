const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Weather-App",
    width: 600,
    height: 900,
    frame: false,
    titleBarStyle: "hidden",
    resizable: false,      
    maximizable: false,
    webPreferences: {
      preload: __dirname + "/preload.js",
      autoplayPolicy: 'no-user-gesture-required',
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:5173");
}

ipcMain.on("close-app", () => {
  if (mainWindow) mainWindow.close();
});

ipcMain.on("minimize-app", () => {
  if (mainWindow) mainWindow.minimize();
});


app.whenReady().then(() => {
  createWindow();
  setInterval(detectSiteUsage, 5000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
