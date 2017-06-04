import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Button, Classes, Intent, Overlay } from '@blueprintjs/core';
import classNames from 'classnames';
import { openNewWindow } from '../../../utils/windows.util';

const classes = classNames(
  'mr-2',
  'px-6',
  'd-flex',
  'justify-content-center',
  'flex-column',
  'position-relative',
  'h-exact-450',
  'bg-dark-gray-5',
  'text-white',
  Classes.CARD,
  Classes.ELEVATION_4
);

const leftArrowButton = classNames(
  'position-absolute', 'absolute-left-offset-10'
)

const leftArrow = classNames(
  'pt-icon-large', 'pt-icon-double-chevron-left'
)

const rightArrowButton = classNames(
  'position-absolute', 'absolute-right-offset-10'
)

const rightArrow = classNames(
  'pt-icon-large', 'pt-icon-double-chevron-right'
)

class WelcomeSlides extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0
    }
    this.onEndOfSlides = this.onEndOfSlides.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
  }

  goToSlide(slideNumber) {
    this.slider.slickGoTo(slideNumber);
    this.setState({
      currentSlide: slideNumber
    });
  }

  onEndOfSlides() {
    const { showWelcomeSlides, setAppSettings, setElectronSettings } = this.props;
    setAppSettings({ showWelcomeSlides: true });
    setElectronSettings('system.showWelcomeSlides', false);
  }

  render() {
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
      swipeToSlide: true,
      afterChange: (idx) => this.setState({currentSlide: idx})
    };
    const { showWelcomeSlides } = this.props;
    return (
      <Overlay isOpen={showWelcomeSlides}>
        <Slider ref={slider => this.slider = slider}
          {...sliderSettings}
          className="d-flex align-items-center vh-100 bring-to-front">
          <div className={classes.concat(' text-center')}>
            <h3 className="h1 mb-5">Welcome to ZenFocus</h3>
            <p>
              Your feedback and support will be greatly needed to help create a tool that will benefit millions who find it difficult to stay focus.
            </p>
            <p>
              <span>Interested in contributing code? Visit our open-sourced project directory - </span>
              <a
                role="link"
                tabIndex={0}
                onClick={() => openNewWindow('https://github.com/builtwithluv/ZenFocus')}>
                https://github.com/builtwithluv/ZenFocus
              </a>
            </p>
            {this.state.currentSlide === 0 && <a className={rightArrowButton} onClick={() => this.goToSlide(1)}>
              <span className={rightArrow}></span>
            </a>}
          </div>
          <div className={classes}>
            <h3>What is the Pomodoro technique?</h3>
            <p>
              <span>Our app is heavily based on the </span>
              <a
                role="link"
                tabIndex={0}
                onClick={() => openNewWindow('https://en.wikipedia.org/wiki/Pomodoro_Technique')}>
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
            {this.state.currentSlide === 1 && <a className={leftArrowButton} onClick={() => this.goToSlide(0)}>
              <span className={leftArrow}></span>
            </a>}
            {this.state.currentSlide === 1 && <a className={rightArrowButton} onClick={() => this.goToSlide(2)}>
              <span className={rightArrow}></span>
            </a>}
          </div>
          <div className={classes}>
            <h3>Giving Feedback and Reporting Issues</h3>
            <p>The impact of our app is determined by your inputs.</p>
            <p>
              Please do not forget to report any bugs, request any features and/or
              provide general feedbacks. We take what you say very seriously.
            </p>
            <p>
              To give feedback and/or to report any issues, click on the <code>Help</code> menu option.
            </p>
            <p>We look forward to hearing from you. <span className="pt-icon-heart text-red" /></p>
            <div className="text-right">
              <Button
                text="Start Ticking"
                intent={Intent.SUCCESS}
                onClick={this.onEndOfSlides}
              />
            </div>
            {this.state.currentSlide === 2 && <a className={leftArrowButton} onClick={() => this.goToSlide(1)}>
              <span className={leftArrow}></span>
            </a>}
          </div>
        </Slider>
      </Overlay>
    );
  }
}

WelcomeSlides.propTypes = {
  showWelcomeSlides: PropTypes.bool.isRequired,
  setAppSettings: PropTypes.func.isRequired,
  setElectronSettings: PropTypes.func.isRequired
};

export default WelcomeSlides;
