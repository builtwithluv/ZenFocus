import settings from 'electron-settings';

export const flush = (token, opts = {}) => {
  const done = settings.get(token, false);
  const local = settings.getAll();

  if (!done) {
    settings
      .deleteAll()
      .set(token, true);

    Object.entries(opts).forEach(opt => {
      const [key, restore] = opt;
      if (restore) settings.set(key, local[key]);
    });
  }
};
