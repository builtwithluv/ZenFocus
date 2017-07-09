import settings from 'electron-settings';

export default function flush() {
  const done = settings.get('DONE_FLUSH', false);

  if (!done) {
    settings
      .deleteAll()
      .set('DONE_FLUSH', true);
  }
}
