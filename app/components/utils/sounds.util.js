import {
  library as getSoundLibrary
} from 'selectors/sounds.selectors';

export const createAudioTag = ({ id, src, title, soundType }) => {
  const audio = new Audio(src);
  audio.id = id;
  audio.title = title;
  audio.soundType = soundType;
  return audio;
};

export const pauseAllSounds = state => {
  const library = getSoundLibrary(state);
  library.forEach(sound => sound.pause());
};
