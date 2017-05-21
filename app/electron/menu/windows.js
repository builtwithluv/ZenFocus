import { shell } from 'electron';
import {
  LOAD_CHARTS,
  LOAD_SETTINGS
} from '../../events';

export default function buildWindowsMenu(win) {
  return [{
    label: '&File',
    submenu: [{
      label: '&Settings',
      click: () => {
        win.webContents.send(LOAD_SETTINGS);
      }
    }, {
      label: '&Quit',
      accelerator: 'Ctrl+W',
      click: () => {
        win.close();
      }
    }]
  }, {
    label: '&View',
    submenu: (process.env.NODE_ENV === 'development') ? [{
      label: '&Reload',
      accelerator: 'Ctrl+R',
      click: () => {
        win.webContents.reload();
      }
    }, {
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      click: () => {
        win.setFullScreen(!win.isFullScreen());
      }
    }, {
      label: 'Toggle &Developer Tools',
      accelerator: 'Alt+Ctrl+I',
      click: () => {
        win.toggleDevTools();
      }
    }, {
      label: 'Charts',
      click: () => win.webContents.send(LOAD_CHARTS)
    }] : [{
      label: 'Charts',
      click: () => win.webContents.send(LOAD_CHARTS)
    }, {
      type: 'separator'
    }, {
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      click: () => {
        win.setFullScreen(!win.isFullScreen());
      }
    }, {
      label: 'Toggle &Developer Tools',
      accelerator: 'Alt+Ctrl+I',
      click: () => {
        win.toggleDevTools();
      }
    }]
  }, {
    label: 'Help',
    submenu: [{
      label: 'Learn More',
      click() {
        shell.openExternal('http://electron.atom.io');
      }
    }, {
      label: 'Documentation',
      click() {
        shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
      }
    }]
  }];
}
