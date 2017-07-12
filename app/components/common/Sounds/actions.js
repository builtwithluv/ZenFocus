// @flow

import settings from 'electron-settings';
import uuidv4 from 'uuid/v4';

import { ElectronSettingsPaths } from 'enums';

import {
  ADD_SOUND,
  REMOVE_SOUND,
  SET_AUDIO,
  TOGGLE_AUDIO_PHASE,
  TOGGLE_AUDIO_TICK,
} from 'common/Sounds/types';

import { pauseAllSounds } from 'utils/sounds.util';

import { setElectronSettings } from 'components/App/actions';

import defaultLibrary from 'common/Sounds/library';

export const setAudio = (id: string, phase: Phase) => (dispatch: Dispatch, getState: GetState) => {
  const state = getState();

  pauseAllSounds(state);

  dispatch({
    type: SET_AUDIO,
    payload: {
      id,
      phase
    }
  });
};

export const toggleAudioPhase = () => ({
  type: TOGGLE_AUDIO_PHASE
});

export const toggleAudioTick = () => ({
  type: TOGGLE_AUDIO_TICK
});

export const addSound = (
  title: string,
  src: string,
  soundType: SoundType
) => (dispatch: Dispatch) => {
  const { LIBRARY } = ElectronSettingsPaths;
  const localLibrary = settings.get(LIBRARY, defaultLibrary);
  const payload = {
    title,
    src,
    soundType,
    id: uuidv4()
  };

  dispatch(setElectronSettings(LIBRARY, [...localLibrary, payload]));
  dispatch({ type: ADD_SOUND, ...payload });
};

export const removeSound = (id: string) => (dispatch: Dispatch) => {
  const { LIBRARY } = ElectronSettingsPaths;
  const localLib = settings.get(LIBRARY, defaultLibrary);
  const newLocalLib = localLib.filter(sound => sound.id !== id);

  dispatch(setElectronSettings(LIBRARY, newLocalLib));
  dispatch({ type: REMOVE_SOUND, payload: { id } });
};
