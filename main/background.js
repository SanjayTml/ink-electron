import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import * as Store from 'electron-store';
import { createWindow, exitOnChange } from './helpers';

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

ipcMain.on('get-projects', (event, arg) => {
  event.returnValue = store.get('projects') || [];
});

ipcMain.on('add-project', (event, arg) => {
  const projects = store.get('projects') || [];
  projects.push(arg);
  store.set('projects', projects);
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
