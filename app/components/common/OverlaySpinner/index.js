import React from 'react';
import PropTypes from 'prop-types';
import { Intent, Overlay, Spinner } from '@blueprintjs/core';

const OverlaySpinner = ({ isOpen, children }) =>
  <Overlay
    canEscapeKeyClose={false}
    canOutsideClickClose={false}
    isOpen={isOpen}
    backdropClassName="bg-black"
  >
    <div
      className={`
        d-flex flex-column align-items-center justify-content-center
        w-100 h-100 bring-to-front
      `}
    >
      <Spinner intent={Intent.SUCCESS} className="w-50" />
      <div className="mt-2 text-white">
        {children}
      </div>
    </div>
  </Overlay>;

OverlaySpinner.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node
};

export default OverlaySpinner;
