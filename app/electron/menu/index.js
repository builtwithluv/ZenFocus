import { Menu } from 'electron';
import darwinMenuBuilder from './darwin';
import windowsMenuBuilder from './windows';

export default function menuBuilder(win) {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    setupDevelopmentEnvironment(win);
  }

  let template;

  if (process.platform === 'darwin') template = darwinMenuBuilder(win);
  else template = windowsMenuBuilder(win);

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  return menu;
}

function setupDevelopmentEnvironment(win) {
  win.openDevTools();
  win.webContents.on('context-menu', (e, props) => {
    const { x, y } = props;

    Menu
      .buildFromTemplate([{
        label: 'Inspect element',
        click: () => {
          win.inspectElement(x, y);
        }
      }])
      .popup(win);
  });
}
