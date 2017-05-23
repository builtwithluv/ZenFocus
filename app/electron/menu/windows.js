import { shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import {
  LOAD_CHARTS,
  LOAD_SETTINGS,
  SEND_GIVE_FEEDBACK,
  SEND_REPORT_ISSUE
} from '../events';

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
    }, {
      label: 'Check for Updates...',
      click: () => autoUpdater.checkForUpdates()
    }]
  }, {
    label: 'Feedback',
    submenu: [
      {
        label: 'Provide Feedback',
        click: () => win.webContents.send(SEND_GIVE_FEEDBACK)
      },
      {
        label: 'Report Issue',
        click: () => win.webContents.send(SEND_REPORT_ISSUE)
      }
    ]
  }];
}
