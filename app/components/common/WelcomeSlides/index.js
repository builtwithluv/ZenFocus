import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Button, Classes, Intent, Overlay } from '@blueprintjs/core';
import classNames from 'classnames';
import { openNewWindow } from '../../../utils/windows.util';

const classes = classNames(
  'mr-2',
  'h-exact-325',
  Classes.CARD,
  Classes.ELEVATION_4
);

const WelcomeSlides = ({ showWelcomeSlides, setAppSettings, setElectronSettings }) => {
  const sliderSettings = {
    accessibility: true,
    adaptiveHeight: false,
    arrows: false,
    autoPlay: false,
    centerMode: true,
    dots: false,
    focusOnSelect: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true
  };

  const onEndOfSlides = () => {
    setAppSettings({ showWelcomeSlides: false });
    setElectronSettings('system.showWelcomeSlides', false);
  };

  return (
    <Overlay isOpen={showWelcomeSlides}>
      <Slider
        {...sliderSettings}
        className="d-flex align-items-center vh-100 bring-to-front"
      >
        {WelcomeSlides.renderSlideOne()}
        {WelcomeSlides.renderSlideTwo()}
        {WelcomeSlides.renderSlideThree(onEndOfSlides)}
      </Slider>
    </Overlay>
  );
};

WelcomeSlides.renderSlideOne = () => (
  <div className={classes}>
    <h3>Thank you for being our first alpha testers!</h3>
    <p>
      Your feedback and support will be greatly needed to help create a tool that
      will benefit millions who find it difficult to stay focus.
    </p>
    <p>
      <span>Interested in contributing code? Visit our open-sourced project directory - </span>
      <a
        role="link"
        tabIndex={0}
        onClick={() => openNewWindow('https://github.com/builtwithluv/ZenFocus')}
      >
        https://github.com/builtwithluv/ZenFocus
      </a>
    </p>
  </div>
);

WelcomeSlides.renderSlideTwo = () => (
  <div className={classes}>
    <h3>What is the Pomodoro technique?</h3>
    <p>
      <span>Our app is heavily based on the </span>
      <a
        role="link"
        tabIndex={0}
        onClick={() => openNewWindow('https://en.wikipedia.org/wiki/Pomodoro_Technique')}
      >
        Pomodoro technique
      </a>
      <span>.</span>
    </p>
    <p>
      Essentially, you switch between a few phases - <code>focus</code>, <code>short break</code>
      <span> and</span> <code>long break</code>. A round is when you complete both a focus
      and break phase. After completing a number of rounds, you then receive a long break instead of
      a short break. You would keep on repeating rounds until you complete
      a desired number of rounds.
    </p>
    <p>
      <strong>
        It is very crucial that you respect each phase! Stay 100% focus and be 100% relaxed.
      </strong>
    </p>
  </div>
);

WelcomeSlides.renderSlideThree = (onEndOfSlides) => (
  <div className={classes}>
    <h3>Giving Feedback and Reporting Issues</h3>
    <p>The impact of our app is determined by your inputs.</p>
    <p>
      Please do not forget to report any bugs, request any features and/or
      provide general feedbacks. We take what you say very seriously.
    </p>
    <p>
      To give feedback and/or to report any issues, click on the <code>Feedback</code> menu option.
    </p>
    <p>We look forward to hearing from you. <span className="pt-icon-heart text-red" /></p>
    <div className="text-right">
      <Button
        text="Start Ticking"
        intent={Intent.SUCCESS}
        onClick={onEndOfSlides}
      />
    </div>
  </div>
);

WelcomeSlides.propTypes = {
  showWelcomeSlides: PropTypes.bool.isRequired,
  setAppSettings: PropTypes.func.isRequired,
  setElectronSettings: PropTypes.func.isRequired
};

export default WelcomeSlides;
