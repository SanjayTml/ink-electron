'use strict';

import { app } from 'electron';
import serve from 'electron-serve';
import { ipcMain as ipc } from 'electron-better-ipc';
import { createWindow, exitOnChange } from './helpers';
import { getProjectState, commitProject, addProject } from './lib/project';
import { getGraph } from './lib/git/graph';
import * as projectStore from './lib/store/project-store';
import Git from 'nodegit';

const isProd = process.env.NODE_ENV === 'production';
const homeUrl = isProd ? 'app://./home.html' : 'http://localhost:8888/home';

if (isProd) {
  serve({ directory: 'app' });
} else {
  exitOnChange();
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

async function main() {
  projectStore.init();
  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });
  mainWindow.loadURL(homeUrl);
  if (!isProd) {
    mainWindow.webContents.openDevTools();
  }
}

app.on('ready', main);

app.on('window-all-closed', () => {
  app.quit();
});

ipc.answerRenderer('fetch-projects', () => projectStore.list());

ipc.answerRenderer('reset-projects', () => projectStore.reset());

ipc.answerRenderer('add-project', async projectPath => {
  return await addProject(projectPath);
});

ipc.answerRenderer('get-project-state', async projectPath => {
  return await getProjectState(projectPath);
});

ipc.answerRenderer('get-project-history', async projectPath => {
  const repo = await Git.Repository.open(`${projectPath}/.git`);
  return await getGraph(repo);
});

ipc.answerRenderer('commit-project', async ({ projectPath, commitMessage }) => {
  return await commitProject(projectPath, commitMessage);
});
