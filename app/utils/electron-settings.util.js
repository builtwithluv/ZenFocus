import settings from 'electron-settings';

export default {
  get(key, def) {
    return settings.get(key, def);
  },

  set(key, value, def) {
    return settings.set(key, value, def);
  }
};
