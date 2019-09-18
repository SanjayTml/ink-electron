import { resolve as resolvePath } from 'path';
import { app } from 'electron';
import serve from 'electron-serve';
import * as Store from 'electron-store';
import { ipcMain as ipc } from 'electron-better-ipc';
import { createWindow, exitOnChange } from './helpers';
import { getProjectState, validateProject, commitProject } from './lib/project';

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  exitOnChange();
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

const store = new Store({ name: 'data' });
if (!store.get('projects')) {
  store.set('projects', []);
}

ipc.answerRenderer('fetch-projects', () => store.get('projects'));

ipc.answerRenderer('reset-projects', () => {
  store.set('projects', []);
  return store.get('projects');
});

ipc.answerRenderer('add-project', async projectPath => {
  const projects = store.get('projects');
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
  return store.get('projects');
});

ipc.answerRenderer(
  'get-project-state',
  async projectPath => await getProjectState(projectPath)
);

ipc.answerRenderer(
  'commit-project', async ({ projectPath, commitMessage }) => {
    console.log(commitMessage)
  try {
    const id = await commitProject(projectPath, commitMessage)
    return id;
  } catch (err) {
    console.error(err);
    return;
  }
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
