import React from 'react';
import classNames from 'classnames';

import shortbreak from 'assets/images/shortbreak.png';

const imageStyles = classNames('mx-auto', 'fit-image');

const slideThree = (
  <div>
    <img
      src={shortbreak}
      alt="shortbreak"
      title="short break phase"
      className={imageStyles}
      draggable="false"
    />
    <h2 className="zen-red">Take a short break</h2>
    <p>Relax, Stretch, Drink Water, Walk, etc.</p>
  </div>
);

export default slideThree;
