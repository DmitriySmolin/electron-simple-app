import { ipcRenderer, shell } from 'electron';

window.openURL = (url) => {
  shell.openExternal(url);
};

// document.addEventListener('DOMContentLoaded', () => {
//   window.addEventListener('offline', () => ipcRenderer.send('offline'));
//   window.addEventListener('online', () => ipcRenderer.send('online'));
// });
