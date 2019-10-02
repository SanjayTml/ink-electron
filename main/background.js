"use strict";

import { resolve as resolvePath } from "path";
import { app } from "electron";
import serve from "electron-serve";
import { ipcMain as ipc } from "electron-better-ipc";
import { createWindow, exitOnChange } from "./helpers";
import { getProjectState, initProject, commitProject } from "./lib/project";
import * as projectStore from "./lib/store/project-store";

const isProd = process.env.NODE_ENV === "production";
const homeUrl = isProd ? "app://./home.html" : "http://localhost:8888/home";

if (isProd) {
  serve({ directory: "app" });
} else {
  exitOnChange();
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

async function main() {
  projectStore.init();
  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600
  });
  mainWindow.loadURL(homeUrl);
  if (!isProd) {
    mainWindow.webContents.openDevTools();
  }
}

app.on("ready", main);

app.on("window-all-closed", () => {
  app.quit();
});

ipc.answerRenderer("fetch-projects", () => projectStore.list());

ipc.answerRenderer("reset-projects", () => projectStore.reset());

ipc.answerRenderer("add-project", async projectPath => {
  var project = await initProject(projectPath);
  return projectStore.append(project);
});

ipc.answerRenderer(
  "get-project-state",
  async projectPath => await getProjectState(projectPath)
);

ipc.answerRenderer("commit-project", async ({ projectPath, commitMessage }) => {
  return await commitProject(projectPath, commitMessage);
});