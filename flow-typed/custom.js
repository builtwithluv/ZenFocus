/* eslint-disable */
import {
  ElectronSettingsPaths,
  Phases,
  Sounds,
  SoundTypes,
} from 'enums';

// modules
declare module 'uuid/v4' {
  declare module.exports: any;
}

// redux
declare type Action = { type: string, payload: { [key: string]: any } };

// redux-thunk
declare type Dispatch = & ReduxDispatch<Action> & Thunk<Action>
declare type GetState = () => State;

// zen-focus
declare type ElectronSettingPath = $Keys<typeof ElectronSettingsPaths>;
declare type Phase = $Keys<typeof Phases>;
declare type Sound = HTMLAudioElement & { soundType: string };
declare type SoundID = string;
declare type SoundLibrary = Array<HTMLAudioElement & { soundType: string }>;
declare type SoundType = $Keys<typeof SoundTypes>;
