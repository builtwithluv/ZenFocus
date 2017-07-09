export const createAudioTag = ({ id, src, title, soundType }) => {
  const audio = new Audio(src);
  audio.id = id;
  audio.title = title;
  audio.soundType = soundType;
  return audio;
};
