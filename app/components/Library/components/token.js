import React from 'react';
import classNames from 'classnames';

import { Phases } from 'enums';

import { Tag } from '@blueprintjs/core';

const Token = ({ phase }: Phase) => {
  const styles = classNames(
    'pt-round',
    'mr-1',
    {
      'bg-focus-phase': phase === Phases.FOCUS,
      'bg-short-break-phase': phase === Phases.SHORT_BREAK,
      'bg-long-break-phase': phase === Phases.LONG_BREAK
    }
  );

  let content = '';

  switch (phase) {
    case Phases.FOCUS: {
      content = 'F';
      break;
    }

    case Phases.SHORT_BREAK: {
      content = 'S';
      break;
    }

    case Phases.LONG_BREAK: {
      content = 'L';
      break;
    }

    case Phases.TRANSITION: {
      content = 'T';
      break;
    }

    default: {
      return null;
    }
  }

  return <Tag className={styles}>{content}</Tag>;
};

Token.displayName = 'Library.Token';

export default Token;
