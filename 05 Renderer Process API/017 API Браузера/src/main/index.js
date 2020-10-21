import path from 'path';
import { app, screen, BrowserWindow, Menu, ipcMain } from 'electron';

//Создание меню
const createMenu = () => {
  const menuTemplate = [
    {
      label: 'MyApp',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    { label: 'Launch', submenu: [{ label: 'Custom Item' }] },
  ];

  const menu = new Menu.buildFromTemplate(menuTemplate);

  Menu.setApplicationMenu(menu);
};

//Создание контекстного окна
const createContextMenu = () => {
  const ctxMenuTemplate = [{ label: 'Option 1' }, { type: 'separator' }, { label: 'Option 2' }, { label: 'Option 3' }];
  const ctxMenu = new Menu.buildFromTemplate(ctxMenuTemplate);

  return ctxMenu;
};

let online;

ipcMain.on('offline', () => {
  online = false;
  console.log('App is offline');
});

ipcMain.on('online', () => {
  online = true;
  console.log('App is online');
});

//Создание окна
const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  let window = new BrowserWindow({
    with: 800,
    height: 500,
    minWidth: 400,
    minHeight: 400,
    maxWidth: width,
    maxHeight: height,
    show: false,
    // frame: false,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#2980b9',
    webPreferences: {
      preload: path.join(app.getAppPath(), 'preload', 'index.js'),
    },
  });

  //открытие devtools в отдельном окне
  window.webContents.openDevTools({ mode: 'detach' });

  window.webContents.on('context-menu', (event, params) => {
    createContextMenu().popup(window, params.x, params.y);
  });

  window.loadFile('renderer/index.html');

  window.webContents.on('did-finish-load', () => {
    window.webContents.send('mainchannel', { message: 'App is running' });
  });

  window.on('ready-to-show', () => {
    window.show();
  });
};

app.on('ready', () => {
  createMenu();
  createWindow();
  if (online) {
    // do stuff when online
  } else {
    //handle offline
  }
});
