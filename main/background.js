import { resolve as resolvePath } from 'path';
import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import * as Store from 'electron-store';
import { createWindow, exitOnChange } from './helpers';
import { validateProject } from './lib/project';
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  exitOnChange();
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

const store = new Store({ name: 'data' });
const baseUrl = isProd ? 'app://./' : 'http://localhost:8888';

ipcMain.on('get-base-url', event => {
  event.returnValue = baseUrl;
});

const respondWithProjects = event => {
  const projects = store.get('projects') || [];
  event.reply('projects-changed', projects);
};

ipcMain.on('fetch-projects', event => respondWithProjects(event));

ipcMain.on('reset-projects', event => {
  store.set('projects', []);
  respondWithProjects(event);
});

ipcMain.on('add-project', async (event, projectPath) => {
  const projects = store.get('projects') || [];
  const normalizedPath = resolvePath(projectPath);

  if (projects.find(project => project.path === normalizedPath)) {
    // TODO: build an error message ipc bus to the renderer
    console.error('ALREADY EXISTS', normalizedPath);
    return;
  }

  let name, id;

  try {
    const project = await validateProject(projectPath);
    id = project.id;
    name = project.name;
  } catch (err) {
    console.error(err);
    return;
  }

  projects.push({
    id,
    name,
    path: projectPath,
  });

  store.set('projects', projects);
  respondWithProjects(event);
});

(async () => {
  // Can't use app.on('ready',...)
  // https://github.com/sindresorhus/electron-serve/issues/15
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  const homeUrl = isProd ? 'app://./home.html' : 'http://localhost:8888/home';
  mainWindow.loadURL(homeUrl);

  if (!isProd) {
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});
