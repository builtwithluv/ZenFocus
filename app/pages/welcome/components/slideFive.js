import React from 'react';
import classNames from 'classnames';

import settings from 'assets/images/settings.png';

const imageStyles = classNames('mx-auto', 'fit-image');

const slideFive = (
  <div>
    <img
      src={settings}
      alt="settings"
      title="settings"
      className={imageStyles}
      draggable="false"
    />
    <h2 className="zen-red">Customize everything</h2>
    <p>From phase lengths, to long break interval, and number of rounds.</p>
  </div>
);

export default slideFive;
