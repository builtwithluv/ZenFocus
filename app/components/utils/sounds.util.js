import { customSounds as getCustomSounds } from '../selectors/sounds.selectors';
import { SoundTypes } from '../enums';

export const createAudioTag = ({ id, path, title, soundType }) => {
  const audio = new Audio(path);
  audio.id = id;
  audio.title = title;
  audio.soundType = soundType;
  return audio;
};

export const getTickSounds = state => {
  const nativeSounds = Array.from(document.querySelectorAll('audio'));
  const ticks = getCustomSounds(state).filter(sound => sound.soundType === SoundTypes.TICK);
  const ticksAsHTML = ticks.map(createAudioTag);
  return [...nativeSounds, ...ticksAsHTML];
};
