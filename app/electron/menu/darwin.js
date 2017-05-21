import { app, shell } from 'electron';
import {
  LOAD_CHARTS,
  LOAD_SETTINGS
} from '../events';

export default function buildDarwinMenu(win) {
  const subMenuAbout = {
    label: 'ZenFocus',
    submenu: [
      { label: 'About ZenFocus', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
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
  const subMenuEdit = {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'Command+A', selector: 'selectAll:' }
    ]
  };
  const subMenuViewDev = {
    label: 'View',
    submenu: [
      {
        label: 'Charts',
        click: () => win.webContents.send(LOAD_CHARTS)
      },
      { label: 'Reload', accelerator: 'Command+R', click: () => { win.webContents.reload(); } },
      { label: 'Toggle Full Screen', accelerator: 'Ctrl+Command+F', click: () => { win.setFullScreen(!win.isFullScreen()); } },
      { label: 'Toggle Developer Tools', accelerator: 'Alt+Command+I', click: () => { win.toggleDevTools(); } }
    ]
  };
  const subMenuViewProd = {
    label: 'View',
    submenu: [
      {
        label: 'Charts',
        click: () => win.webContents.send(LOAD_CHARTS)
      },
      { type: 'separator' },
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
      { label: 'Learn More', click() { shell.openExternal('http://electron.atom.io'); } },
      { label: 'Documentation', click() { shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme'); } },
      { label: 'Community Discussions', click() { shell.openExternal('https://discuss.atom.io/c/electron'); } },
      { label: 'Search Issues', click() { shell.openExternal('https://github.com/atom/electron/issues'); } }
    ]
  };

  const subMenuView = process.env.NODE_ENV === 'development'
    ? subMenuViewDev
    : subMenuViewProd;

  return [
    subMenuAbout,
    subMenuEdit,
    subMenuView,
    subMenuWindow,
    subMenuHelp
  ];
}
