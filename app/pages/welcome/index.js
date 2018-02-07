import React from 'react';
import ReactDOM from 'react-dom';

import WelcomeSlides from './welcome-slides';
import MenuBar from '../../components/common/MenuBar';
import '../../app.global.scss';
import './welcome-slides.scss';

class WelcomeScreen extends React.Component {
  render() {
    return (
      <main>
        <MenuBar />
        <WelcomeSlides />
      </main>
    );
  }
}

ReactDOM.render(<WelcomeScreen />, document.querySelector('#root'));
