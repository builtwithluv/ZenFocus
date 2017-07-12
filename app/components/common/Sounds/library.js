import { SoundTypes } from 'enums';

import { soundsPath } from 'utils/path.util';

export default [
  {
    id: '4111001',
    src: soundsPath('corsica-ding.mp3'),
    title: 'Corsica Ding',
    soundType: SoundTypes.TICK
  },
  {
    id: '4111002',
    src: soundsPath('tick.mp3'),
    title: 'Classic Tick',
    soundType: SoundTypes.TICK
  },
  {
    id: '4111003',
    src: soundsPath('water-drop.mp3'),
    title: 'Water Drop',
    soundType: SoundTypes.TICK
  },
];
