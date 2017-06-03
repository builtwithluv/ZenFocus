import { shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import repo from '../../package.json';
import {
  LOAD_SETTINGS,
  SEND_GIVE_FEEDBACK,
  SEND_NEW_SESSION,
  SEND_REPORT_ISSUE,
  SEND_RESET_ROUND
} from '../events';

export default function buildWindowsMenu(win) {
  return [{
    label: '&File',
    submenu: [{
      label: '&New Session',
      accelerator: 'Ctrl+N',
      click: () => win.webContents.send(SEND_NEW_SESSION)
    }, {
      label: '&Reset Round',
      click: () => win.webContents.send(SEND_RESET_ROUND)
    }, {
      type: 'separator'
    }, {
      label: '&Settings',
      click: () => win.webContents.send(LOAD_SETTINGS)
    }, {
      label: '&Quit',
      accelerator: 'Ctrl+W',
      click: () => win.close()
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
    }] : [{
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      click: () => {
        win.setFullScreen(!win.isFullScreen());
      }
    }]
  }, {
    label: 'Help',
    submenu: [
      { label: 'Learn More', click() { shell.openExternal(repo.repository.url); } },
      { label: 'Documentation', click() { shell.openExternal(repo.readme); } },
      { label: 'Search Issues', click() { shell.openExternal(repo.bugs.url); } },
      { label: 'Check for Updates...', click() { autoUpdater.checkForUpdates(); } }
    ]
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
