import settings from 'electron-settings';

export default {
  get(key, def) {
    return settings.get(key, def);
  },

  set(key, value, def) {
    return settings.set(key, value, def);
  },

  flush(token, opts = {}) {
    const done = settings.get(token, false);
    const local = settings.getAll();

    if (!done) {
      settings
        .deleteAll()
        .set(token, true);

      Object.entries(opts).forEach(opt => {
        const [key, restore] = opt;
        if (restore === false) settings.set(key, local[key]);
      });
    }
  }
};
