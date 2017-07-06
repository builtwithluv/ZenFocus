import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Intent, Overlay, Spinner } from '@blueprintjs/core';

const OverlaySpinner = ({ isOpen, children }) => {
  const containerStyles = classNames(
    'd-flex',
    'flex-column',
    'align-items-center',
    'justify-content-center',
    'w-100',
    'h-100',
    'z-21',
  );
  return (
    <Overlay
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      isOpen={isOpen}
      backdropClassName="bg-black"
    >
      <div className={containerStyles}>
        <Spinner intent={Intent.SUCCESS} className="w-50" />
        <div className="mt-2 text-white">
          {children}
        </div>
      </div>
    </Overlay>
  );
};

OverlaySpinner.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node
};

export default OverlaySpinner;
