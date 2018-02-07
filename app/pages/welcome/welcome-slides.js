import { remote } from 'electron';
import React, { PureComponent } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

import {
  slideTwo,
  slideThree,
  slideFour,
  slideFive,
  Navigation,
} from 'pages/welcome/components';

export default class WelcomeSlides extends PureComponent {
  state = {
    currentSlide: 0,
    totalSlides: 4,
    slider: {
      props: {},
      context: {},
      innerSlider: {},
      refs: {},
      updater: {},
      state: {}
    }
  }

  closeSlides = () => {
    remote.getCurrentWindow().close();
  }

  updateCurrentSlide = (e) => {
    this.setState({
      currentSlide: e
    });
  }

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
        {slideTwo}
        {slideThree}
        {slideFour}
        {slideFive}
      </Slider>
    );

    return (
      <div className="welcome-slides">
        {slider}
        <Navigation {...this.state} closeSlides={this.closeSlides} />
      </div>
    );
  }
}
