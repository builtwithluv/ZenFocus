import { library as getSoundLibrary } from '../selectors/sounds.selectors';
import { SoundTypes } from '../enums';

export const createAudioTag = ({ id, src, title, soundType }) => {
  const audio = new Audio(src);
  audio.id = id;
  audio.title = title;
  audio.soundType = soundType;
  return audio;
};

export const getTickSounds = state => {
  const library = getSoundLibrary(state).filter(sound => sound.soundType === SoundTypes.TICK);
  const ticksAsHTML = library.map(createAudioTag);
  return ticksAsHTML;
};
