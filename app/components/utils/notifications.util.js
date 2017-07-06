import { remote } from 'electron';
import settings from 'electron-settings';
import { NotificationTypes, Phases } from '../enums';

export const triggerNotification = (phase, customNotification = null) => {
  const notificationType = settings.get(
    'system.notificationType',
    NotificationTypes.PHASE_CHANGES_NO_WINDOW
  );
  let title;
  let body;

  switch (phase) {
    case Phases.FOCUS:
      title = 'Focus phase over';
      body = 'Time to take a break';
      break;
    case Phases.SHORT_BREAK:
      title = 'Short break phase over';
      body = 'Back to focus!';
      break;
    case Phases.LONG_BREAK:
      title = 'Long break phase over';
      body = 'Back to focus!';
      break;
    default: {
      title = 'Thinking...';
      body = 'What to do, what to do...';
    }
  }

  if (customNotification) {
    title = customNotification.title;
    body = customNotification.body;
  }

  switch (notificationType) {
    case NotificationTypes.PHASE_CHANGES_ALL: {
      new Notification(title, { body }); // eslint-disable-line no-new
      break;
    }
    case NotificationTypes.PHASE_CHANGES_NO_WINDOW: {
      const win = remote.getCurrentWindow();
      const isFocused = win.isFocused();
      if (!isFocused) new Notification(title, { body }); // eslint-disable-line no-new
      break;
    }
    default: {
      new Notification(title, { body }); // eslint-disable-line no-new
    }
  }
};
