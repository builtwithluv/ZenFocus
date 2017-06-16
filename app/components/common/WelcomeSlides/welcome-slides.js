import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Button, Classes, Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { openNewWindow } from '../../utils/windows.util';
import logo from '../../../assets/images/logo.png';

export default class WelcomeSlides extends PureComponent {
  static propTypes = {
    setAppSettings: PropTypes.func.isRequired,
    setElectronSettings: PropTypes.func.isRequired
  };

  state = { currentSlide: 0 };

  goToSlide = (slideNumber) => {
    this.slider.slickGoTo(slideNumber);
    this.setState({
      currentSlide: slideNumber
    });
  };

  onEndOfSlides = () => {
    const { setAppSettings, setElectronSettings } = this.props;
    setAppSettings({ showWelcomeSlides: false });
    setElectronSettings('system.showWelcomeSlides', false);
  };

  renderButtons = (slideNumber) => {
    const TOTAL_SLIDES = 3;
    const { currentSlide } = this.state;
    const hasLeftBtn = slideNumber > 0 && currentSlide === slideNumber;
    const hasRightBtn = slideNumber < TOTAL_SLIDES - 1 && currentSlide === slideNumber;
    const btns = [];

    const btnStyles = classNames(
      'position-absolute',
      'pt-minimal',
      'btn-no-hover'
    );

    const leftBtn = (
      <Button
        iconName="double-chevron-left"
        onClick={() => this.goToSlide(slideNumber - 1)}
        className={classNames(btnStyles, 'absolute-left-offset-10')}
      />
    );

    const rightBtn = (
      <Button
        iconName="double-chevron-right"
        onClick={() => this.goToSlide(slideNumber + 1)}
        className={classNames(btnStyles, 'absolute-right-offset-10')}
      />
    );

    if (hasLeftBtn && hasRightBtn) btns.push(leftBtn, rightBtn);
    else if (hasLeftBtn) btns.push(leftBtn);
    else btns.push(rightBtn);

    return btns;
  };

  renderSlide = (content, slideNumber) => {
    const containerStyles = classNames(
      'px-6',
      'd-flex',
      'justify-content-center',
      'flex-column',
      'vh-100',
      'position-relative',
      'bg-dark-gray-5',
      'text-white',
      Classes.CARD,
      Classes.ELEVATION_4
    );

    return (
      <div key={`slide-${slideNumber}`} className={containerStyles}>
        {content}
        {this.renderButtons(slideNumber)}
      </div>
    );
  };

  render() {
    const sliderSettings = {
      accessibility: true,
      arrows: false,
      dots: false,
      infinite: false,
      afterChange: idx => this.setState({ currentSlide: idx })
    };

    const slideOne = (
      <div className="text-center">
        <img src={logo} alt="logo" className="logo mx-auto" />
        <h3 className="h1 mb-5">Zen Focus</h3>
        <p>
          Your feedback and support will be greatly needed to help create a
          tool that will benefit millions who find it difficult to stay
          focus.
        </p>
        <p>
          <span>
            Interested in contributing code? Visit our open-sourced project
            directory -
            {' '}
          </span>
          <Button
            onClick={() =>
              openNewWindow('https://github.com/builtwithluv/ZenFocus')}
            text="https://github.com/builtwithluv/ZenFocus"
          />
        </p>
      </div>
    );

    const slideTwo = (
      <div>
        <h3>What is our focus technique?</h3>
        <p>
          <span>Our app is heavily based on the </span>
          <Button
            onClick={() =>
              openNewWindow(
                'https://en.wikipedia.org/wiki/Pomodoro_Technique'
              )}
            text="Pomodoro technique"
          />
          <span>.</span>
        </p>
        <p>
          Essentially, you switch between a few phases - <code>focus</code>,
          {' '}<code>short break</code>
          <span> and</span> <code>long break</code>. A round is when you
          complete both a focus and break phase. After completing a number
          of
          rounds, you then receive a long break instead of a short break.
          You
          would keep on repeating rounds until you complete a desired
          number of rounds.
        </p>
        <p>
          <strong>
            It is very crucial that you respect each phase! Stay 100% focus
            and be 100% relaxed.
          </strong>
        </p>
      </div>
    );

    const slideThree = (
      <div>
        <h3>Giving Feedback and Reporting Issues</h3>
        <p>The impact of our app is determined by your inputs.</p>
        <p>
          Please do not forget to report any bugs, request any features
          and/or
          provide general feedbacks. We take what you say very seriously.
        </p>
        <p>
          To give feedback and/or to report any issues, click on the
          {' '}<code>Help</code> menu option.
        </p>
        <p>
          We look forward to hearing from you.
          {' '}<span className="pt-icon-heart text-red" />
        </p>
        <div className="text-right">
          <Button
            text="Start Ticking"
            intent={Intent.SUCCESS}
            onClick={this.onEndOfSlides}
          />
        </div>
      </div>
    );

    return (
      <Slider
        ref={slider => (this.slider = slider)}
        {...sliderSettings}
        className="welcome-slides"
      >
        {[slideOne, slideTwo, slideThree].map((slide, i) => this.renderSlide(slide, i))}
      </Slider>
    );
  }
}
