import { app, screen, BrowserWindow, Menu, MenuItem, Tray } from 'electron';
import path from 'path';
import icon from 'trayTemplate.png';

//Создание меню
const createMenu = () => {
  // const menu = new Menu();
  // menu.append(
  //   new MenuItem({
  //     label: 'MyApp',
  //     submenu: [
  //       new MenuItem({
  //         label: 'Option 1',
  //         click() {
  //           console.log('Option 1 clicked');
  //         },
  //       }),
  //       new MenuItem({
  //         type: 'separator',
  //       }),
  //       new MenuItem({
  //         label: 'Option 2',
  //         click() {
  //           console.log('Option 2 clicked');
  //         },
  //       }),
  //     ],
  //   })
  // );

  const menuTemplate = [
    {
      label: 'MyApp',
      submenu: [
        // {
        //   label: 'Option 1',
        //   click() {
        //     console.log('Option 1 clicked');
        //   },
        // },
        // { type: 'separator' },
        // {
        //   label: 'Option 2',
        //   click() {
        //     console.log('Option 2 clicked');
        //   },
        // },
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
    // nodeIntegration is not safe. Use preload script instead
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // window.loadURL('https://google.com');

  window.on('ready-to-show', () => {
    window.show();
  });

  window.webContents.on('context-menu', (event, params) => {
    createContextMenu().popup(window, params.x, params.y);
  });

  window.loadFile('renderer/index.html');

  // window.webContents.openDevTools();

  //Создание TrayMenu
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show Awesome app',
      click: () => {
        window.isVisible() ? window.hide() : window.show();
      },
    },
    { role: 'quit' },
  ]);
  tray.setContextMenu(trayMenu);

  const tray = new Tray(path.resolve(__dirname, icon));
  tray.setToolTip('Awesome app');
  // tray.on('click', () => {
  //   window.isVisible() ? window.hide() : window.show();
  // });
};

app.on('ready', () => {
  createMenu();
  createWindow();
});
