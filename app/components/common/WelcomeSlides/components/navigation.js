import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const navigationStyles = classNames(
  'fixed-bottom',
  'd-flex',
  'justify-content-between',
  'draggable'
);

const Navigation = ({ currentSlide, totalSlides, slider, closeSlides }) => {
  const buttonStyles = classNames('my-1', 'bg-none', 'border-none', 'text-white', 'non-draggable');
  const iconStyles = classNames('m-1', 'pt-icon-large', 'circle-border');
  const leftButton = (
    <button className={buttonStyles} onClick={() => slider.slickPrev()}>
      <span className={classNames(iconStyles, 'pt-icon-arrow-left')} />
    </button>
  );
  const rightButton = (
    <button className={buttonStyles} onClick={() => slider.slickNext()}>
      <span className={classNames(iconStyles, 'pt-icon-arrow-right')} />
    </button>
  );
  const closeButton = (
    <button className={buttonStyles} onClick={() => closeSlides()}>
      <span className={classNames(iconStyles, 'pt-icon-tick', 'zen-red')} />
    </button>
  );

  return (
    <div className={navigationStyles}>
      {currentSlide === 0 ? <div /> : leftButton}
      {currentSlide === totalSlides - 1 ? closeButton : rightButton}
    </div>
  );
};

Navigation.propTypes = {
  currentSlide: PropTypes.number.isRequired,
  totalSlides: PropTypes.number.isRequired,
  slider: PropTypes.shape({
    props: PropTypes.object,
    context: PropTypes.object,
    innerSlider: PropTypes.object,
    refs: PropTypes.object,
    updater: PropTypes.object,
    state: PropTypes.object
  }).isRequired,
  closeSlides: PropTypes.func.isRequired
};

export default Navigation;
