import React from 'react';
import { Tab2, Tabs2 } from '@blueprintjs/core';
import { getAllSounds } from '../../../utils/sounds.util';

import TickPanel from './components/tick-panel';
import VolumnControl from './components/volumn-control';

const SoundsPanel = (props) => (
  <div>
    <Tabs2 id="SoundType" animate={false}>
      <Tab2
        id="soundTypeTick"
        title="Tick"
        panel={<TickPanel {...props} />}
      />
    </Tabs2>
    <VolumnControl className="mt-4" {...props} />
  </div>
);

SoundsPanel.defaultProps = {
  sounds: getAllSounds()
};

export default SoundsPanel;
