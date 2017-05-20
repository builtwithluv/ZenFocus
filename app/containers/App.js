import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import classNames from 'classnames';
import settings from 'electron-settings';
import { Button, Intent } from '@blueprintjs/core';
import Feedback from '../components/common/Feedback';
import {
  LOAD_CHARTS,
  LOAD_SETTINGS
} from '../events';
import {
  loadRoundsData
} from '../components/common/Rounds/actions';
import {
  Phases
} from '../components/common/CountdownTimer/enums';

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      showFeedback: false,
      url: ''
    };
  }

  componentWillMount() {
    const { pushRoute } = this.props;
    ipcRenderer.on(LOAD_CHARTS, () => pushRoute('/charts'));
    ipcRenderer.on(LOAD_SETTINGS, () => pushRoute('/settings'));
    this.loadSavedData();
  }

  loadSavedData() {
    const {
      setRoundsData
    } = this.props;
    const data = settings.getAll();

    const { rounds = {} } = data;
    setRoundsData(rounds);
  }

  onGiveFeedbackClick(type) {
    const url = type === 'feedback'
      ? 'https://docs.google.com/forms/d/e/1FAIpQLSccbcfGtY6MpQeRM2hYQ-Xzji6TDKnG9Mcr_1fluDQCU0JoTA/viewform?embedded=true'
      : 'https://docs.google.com/forms/d/e/1FAIpQLSc498W0BqVHGhhb_A9WyxrHGfbMeynnuEXa5NYpjMD9nDQpng/viewform?embedded=true';

    this.setState({
      showFeedback: true,
      url
    });
  }

  closeFeedback() {
    this.setState({ showFeedback: false });
  }

  render() {
    const { currentPhase, goToMain } = this.props;
    const { showFeedback, url } = this.state;
    const buttonClass = classNames({
      'pt-minimal': true,
      'btn-phase': true,
      'w-100': true,
      'bg-focus-phase': currentPhase === 0,
      'bg-short-break-phase': currentPhase === 1,
      'bg-long-break-phase': currentPhase === 2
    });

    return (
      <main className="pt-dark">
        <Button
          text={Phases[currentPhase]}
          onClick={goToMain}
          className={buttonClass}
        />
        {this.props.children}
        <div className="fixed-bottom ml-3 mb-2">
          <Button
            text="Please Leave Feedback"
            onClick={() => this.onGiveFeedbackClick('feedback')}
            className="bg-yellow text-black font-weight-bold mr-3"
          />
          <Button
            text="Report Issue"
            intent={Intent.DANGER}
            onClick={() => this.onGiveFeedbackClick('issue')}
            className="text-black font-weight-bold"
          />
        </div>
        <Feedback
          showFeedback={showFeedback}
          closeFeedback={() => this.closeFeedback()}
          url={url}
        />
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  currentPhase: PropTypes.number.isRequired,
  goToMain: PropTypes.func.isRequired,
  setRoundsData: PropTypes.func.isRequired,
  pushRoute: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase
});

const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(push('/')),
  setRoundsData: (data) => dispatch(loadRoundsData(data)),
  pushRoute: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
