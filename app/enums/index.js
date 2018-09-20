export const ElectronSettingsPaths = {
  VERSION: 'version',

  // sounds
  LIBRARY: 'sounds.library',
  FOCUS_SOUND: 'sounds.focusPhase',
  SHORT_BREAK_SOUND: 'sounds.shortBreakPhase',
  LONG_BREAK_SOUND: 'sounds.longBreakPhase',

  // styles
  THEME: 'styles.theme',

  // system
  COMPACT: 'system.compact',
  CONTINUOUS_MODE: 'system.continuousMode',
  MINIMIZE_TO_TRAY: 'system.minimizeToTray',
  NOTIFICATION_TYPE: 'system.notificationType',
  SHOW_RELEASE_NOTES: 'system.showReleaseNotes',
  SHOW_TIMER_BY_TRAY: 'system.showTimerByTray',
  SHOW_TRAY_ICON: 'system.showTrayIcon',
  SHOW_WELCOME_WINDOW: 'system.showWelcomeSlides',
};

export const NotificationTypes = {
  PHASE_CHANGES_NO_WINDOW: 'phase-changes-no-window',
  PHASE_CHANGES_ALL: 'phase-changes-all',
};

export const Phases = {
  FOCUS: 0,
  SHORT_BREAK: 1,
  LONG_BREAK: 2,
  TRANSITION: 3
};

export const Routes = {
  HOME: '/',
  CHARTS: '/charts',
  LIBRARY: '/library',
  SETTINGS: '/settings'
};

export const Sounds = {
  CORSICA_DING: '4111001',
  TICK: '4111002',
  WATER_DROP: '4111003'
};

export const SoundTypes = {
  SONG: 'SONG',
  TICK: 'TICK',
};

export const Themes = {
  DARK: 'DARK',
  LIGHT: 'LIGHT'
};
