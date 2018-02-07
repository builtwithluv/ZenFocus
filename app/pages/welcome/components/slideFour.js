import React from 'react';
import classNames from 'classnames';

import longbreak from 'assets/images/longbreak.png';

const imageStyles = classNames('mx-auto', 'fit-image');

const slideFour = (
  <div>
    <img
      src={longbreak}
      alt="longbreak"
      title="long break phase"
      className={imageStyles}
      draggable="false"
    />
    <h2 className="zen-red">After a few rounds, take a long break</h2>
    <p>Watch Videos, Play Games, Go Outside, Read a Book, etc.</p>
  </div>
);

export default slideFour;
