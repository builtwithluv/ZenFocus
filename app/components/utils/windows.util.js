import { shell } from 'electron';

export const openNewWindow = (link) => shell.openExternal(link);
