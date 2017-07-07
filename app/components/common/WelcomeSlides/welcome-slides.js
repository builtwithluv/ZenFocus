import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import classNames from 'classnames';

import {
  slideOne,
  slideTwo,
  slideThree,
  slideFour,
  slideFive,
  Navigation
} from './components';

export default class WelcomeSlides extends PureComponent {
  static propTypes = {
    setAppSettings: PropTypes.func.isRequired,
    setElectronSettings: PropTypes.func.isRequired
  };

  state = {
    currentSlide: 0,
    totalSlides: 5,
    slider: {
      props: {},
      context: {},
      innerSlider: {},
      refs: {},
      updater: {},
      state: {}
    }
  }

  updateCurrentSlide = (e) => {
    this.setState({
      currentSlide: e
    });
  }

  closeWelcomeSlides = () => {
    const { setAppSettings, setElectronSettings } = this.props;
    setAppSettings({ showWelcomeSlides: false });
    setElectronSettings('system.showWelcomeSlides', false);
  };

  render() {
    const sliderSettings = {
      dots: false,
      infinite: false,
      arrows: false,
      afterChange: this.updateCurrentSlide
    };
    const sliderStyles = classNames(
      'vw-100',
      'vh-100',
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'text-center',
      'bg-dark-theme',
      'text-white'
    );
    const slider = (
      <Slider
        ref={s => this.setState({ slider: s })}
        {...sliderSettings}
        className={sliderStyles}
      >
        {slideOne}
        {slideTwo}
        {slideThree}
        {slideFour}
        {slideFive}
      </Slider>
    );

    return (
      <div className="welcome-slides">
        {slider}
        <Navigation {...this.state} closeSlides={this.closeWelcomeSlides} />
      </div>
    );
  }
}
