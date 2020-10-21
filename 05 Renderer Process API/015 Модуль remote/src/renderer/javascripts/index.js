import { remote } from 'electron';
const { dialog, BrowserWindow, app } = remote;

require('application.css');

window.onload = () => {
  const action = document.getElementById('action');
  action.addEventListener('click', () => {
    // dialog.showMessageBox({ message: 'You have clicked the button' });
    // dialog.showErrorBox('Error', 'Unknown error');
    // let win = new BrowserWindow({
    //   with: 500,
    //   height: 400,
    // });

    app.quit();
  });
};
