import { createSelector } from 'reselect';

import { app } from 'selectors/common.selectors';

export const customNotification = createSelector(
  app,
  a => a.customNotification
);

export const minimizeToTray = createSelector(
  app,
  a => a.minimizeToTray
);

export const notificationType = createSelector(
  app,
  a => a.notificationType
);

export const theme = createSelector(
  app,
  a => a.theme
);
