import { app, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import settings from 'electron-settings';

import {
  LOAD_CHARTS,
  LOAD_SETTINGS,
  OPEN_WELCOME_WINDOW,
  SEND_NEW_SESSION,
  SEND_TOGGLE_COMPACT,
} from '../../channels';

import { openReleaseNotes } from '../../utils/release-notes.util';
import { setFullAppMode } from '../../utils/windows.util';

import repo from '../../package.json';

export default function buildDarwinMenu(win) {
  const subMenuAbout = {
    label: 'ZenFocus',
    submenu: [
      { label: 'About ZenFocus', selector: 'orderFrontStandardAboutPanel:' },
      { type: 'separator' },
      {
        label: 'Check for Updates...',
        click() {
          setFullAppMode(win);
          autoUpdater.checkForUpdates();
        }
      },
      {
        label: 'Preferences',
        submenu: [
          {
            label: '&Settings',
            accelerator: 'Command+,',
            click() {
              setFullAppMode(win);
              win.webContents.send(LOAD_SETTINGS);
            }
          }
        ]
      },
      { label: 'Hide ZenFocus', accelerator: 'Command+H', selector: 'hide:' },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      },
      { label: 'Show All', selector: 'unhideAllApplications:' },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        }
      }
    ]
  };
  const sessionMenu = {
    label: 'Session',
    submenu: [
      {
        label: 'New Session',
        accelerator: 'Command+N',
        click() {
          win.webContents.send(SEND_NEW_SESSION);
        }
      },
    ]
  };

  // View Menu
  const commonSubMenuView = [
    {
      label: 'Charts',
      accelerator: 'Ctrl+Command+C',
      click() {
        win.webContents.send(LOAD_CHARTS);
      }
    },
    { type: 'separator' },
    {
      label: 'Toggle Full Screen',
      accelerator: 'Ctrl+Command+F',
      click() {
        win.setFullScreen(!win.isFullScreen());
      }
    },
    {
      label: 'Toggle Compact Mode',
      accelerator: 'Ctrl+Command+M',
      click() {
        if (win.isFullScreen()) win.setFullScreen(false);
        win.webContents.send(SEND_TOGGLE_COMPACT);
      }
    }
  ];

  const subMenuViewDev = {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          win.webContents.reload();
        }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          win.setFullScreen(!win.isFullScreen());
        }
      },
      { type: 'separator' },
      ...commonSubMenuView,
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          win.toggleDevTools();
        }
      }
    ]
  };

  const subMenuViewProd = {
    label: 'View',
    submenu: [
      ...commonSubMenuView,
    ]
  };

  const subMenuWindow = {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      },
      { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
      { type: 'separator' },
      { label: 'Bring All to Front', selector: 'arrangeInFront:' }
    ]
  };
  const subMenuHelp = {
    label: 'Help',
    submenu: [
      {
        label: 'Welcome',
        click() {
          win.webContents.send(OPEN_WELCOME_WINDOW);
        }
      },
      {
        label: 'Learn More',
        click() {
          shell.openExternal(repo.repository.url);
        }
      },
      {
        label: 'Documentation',
        click() {
          shell.openExternal(repo.readme);
        }
      },
      {
        label: 'Release Notes',
        click() {
          const version = settings.get('version');
          openReleaseNotes(version);
        }
      },
      { type: 'separator' },
      {
        label: 'Search Issues',
        click() {
          shell.openExternal(repo.bugs.url);
        }
      },
      {
        label: 'Report Issue',
        click() {
          shell.openExternal(repo.bugs.url);
        }
      },
      { type: 'separator' },
      {
        label: 'Toggle Developer Tools',
        click() {
          win.toggleDevTools();
        }
      }
    ]
  };

  const subMenuView = process.env.NODE_ENV === 'development'
    ? subMenuViewDev
    : subMenuViewProd;

  return [subMenuAbout, sessionMenu, subMenuView, subMenuWindow, subMenuHelp];
}
