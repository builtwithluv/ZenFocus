import React from 'react';
import { Tab2, Tabs2 } from '@blueprintjs/core';

import TickPanel from './components/tick-panel';
import AddSound from './components/add-sound';
import VolumnControl from './components/volumn-control';

const SoundsPanel = (props) => (
  <div>
    <Tabs2 id="SoundType" className="mb-4" animate={false}>
      <Tab2
        id="soundTypeTick"
        title="Tick"
        panel={<TickPanel {...props} />}
      />
    </Tabs2>
    <AddSound {...props} />
    <VolumnControl className="mt-4" {...props} />
  </div>
);

export default SoundsPanel;
