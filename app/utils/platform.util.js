import os from 'os';

const PLATFORM = os.platform();

const PLATFORMS = {
  linux: 'linux',
  macOS: 'darwin',
  windows: 'win32',
};

export const isLinux = () => PLATFORM === PLATFORMS.linux;
export const isMacOS = () => PLATFORM === PLATFORMS.macOS;
export const isWindows = () => PLATFORM === PLATFORMS.windows;
