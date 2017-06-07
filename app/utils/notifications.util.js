import { ipcRenderer } from 'electron';
import { GET_IS_FOCUSED } from '../electron/events';
import { Phases } from '../containers/enums';

export const triggerNotification = phase => {
  let isFocused = ipcRenderer.sendSync(GET_IS_FOCUSED);
  let title, body, notification;
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
  }

  if (!isFocused) notification = new Notification(title, { body: body });
}
