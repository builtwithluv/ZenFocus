import React from 'react';
import { Tab2, Tabs2 } from '@blueprintjs/core';

import TickPanel from './components/tick-panel';
import VolumeControl from './components/volume-control';
import Library from './components/library-panel';

const SoundsPanel = (props) => (
  <div>
    <Tabs2 id="SoundType" className="mb-4" animate={false}>
      <Tab2
        id="soundTypeTick"
        title="Tick"
        panel={<TickPanel {...props} />}
      />
      <Tab2
        id="library"
        title="Library"
        panel={<Library {...props} />}
        className="mt-0"
      />
      <Tab2
        id="volumeControl"
        title="Volume Control"
        panel={<VolumeControl {...props} />}
      />
    </Tabs2>
  </div>
);

export default SoundsPanel;
