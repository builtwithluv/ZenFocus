import { app, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import {
  LOAD_SETTINGS,
  SEND_GIVE_FEEDBACK,
  SEND_REPORT_ISSUE
} from '../events';

export default function buildDarwinMenu(win) {
  const subMenuAbout = {
    label: 'ZenFocus',
    submenu: [
      { label: 'About ZenFocus', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      {
        label: 'Check for Updates...',
        click: () => autoUpdater.checkForUpdates()
      },
      {
        label: 'Preferences',
        submenu: [
          {
            label: '&Settings',
            accelerator: 'Command+,',
            click: () => win.webContents.send(LOAD_SETTINGS)
          }
        ]
      },
      { label: 'Hide ZenFocus', accelerator: 'Command+H', selector: 'hide:' },
      { label: 'Hide Others', accelerator: 'Command+Shift+H', selector: 'hideOtherApplications:' },
      { label: 'Show All', selector: 'unhideAllApplications:' },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'Command+Q', click: () => { app.quit(); } }
    ]
  };
  const subMenuViewDev = {
    label: 'View',
    submenu: [
      { label: 'Reload', accelerator: 'Command+R', click: () => { win.webContents.reload(); } },
      { label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click: () => { win.setFullScreen(!win.isFullScreen()); } },
      { label: 'Toggle Developer Tools', accelerator: 'Alt+Command+I', click: () => { win.toggleDevTools(); } }
    ]
  };
  const subMenuViewProd = {
    label: 'View',
    submenu: [
      { label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click: () => { win.setFullScreen(!win.isFullScreen()); } }
    ]
  };
  const subMenuWindow = {
    label: 'Window',
    submenu: [
      { label: 'Minimize', accelerator: 'Command+M', selector: 'performMiniaturize:' },
      { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
      { type: 'separator' },
      { label: 'Bring All to Front', selector: 'arrangeInFront:' }
    ]
  };
  const subMenuHelp = {
    label: 'Help',
    submenu: [
      { label: 'Learn More', click() { shell.openExternal('https://zenfocus.surge.com'); } },
      { label: 'Documentation', click() { shell.openExternal('https://github.com/chengsieuly/ZenFocus'); } },
      { label: 'Search Issues', click() { shell.openExternal('https://github.com/chengsieuly/ZenFocus/issues'); } }
    ]
  };

  const subMenuFeedback = {
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
  };

  const subMenuView = process.env.NODE_ENV === 'development'
    ? subMenuViewDev
    : subMenuViewProd;

  return [
    subMenuAbout,
    subMenuView,
    subMenuWindow,
    subMenuHelp,
    subMenuFeedback
  ];
}
