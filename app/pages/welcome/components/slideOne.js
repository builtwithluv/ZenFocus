import React from 'react';
import classNames from 'classnames';

import { openNewWindow } from 'utils/windows.util';

import logo from 'assets/images/logo.png';
import builtwithluv from 'assets/images/builtwithluv.png';

const imageStyles = classNames('mx-auto');
const buttonStyles = classNames('bg-none', 'border-none');

const openZenFocus = () => openNewWindow('https://github.com/builtwithluv/ZenFocus');
const openBuiltwithluv = () => openNewWindow('https://github.com/builtwithluv');

const slideOne = (
  <div>
    <button className={buttonStyles} onClick={openZenFocus}>
      <img
        src={logo}
        alt="logo"
        title="ZenFocus"
        className={imageStyles}
        draggable="false"
      />
    </button>
    <h1 className="zen-red">ZenFocus</h1>
    <button className={buttonStyles} onClick={openBuiltwithluv}>
      <img
        src={builtwithluv}
        alt="organization logo"
        title="Builtwithluv"
        className={classNames(imageStyles, 'builtwithluv')}
        draggable="false"
      />
    </button>
  </div>
);

export default slideOne;
