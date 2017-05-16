import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import {
  LOAD_SETTINGS
} from '../events';

class App extends PureComponent {
  componentWillMount() {
    const { pushRoute } = this.props;
    ipcRenderer.on(LOAD_SETTINGS, () => pushRoute('/settings'));
  }

  render() {
    const { currentPhase } = this.props;
    const backgroundColor = currentPhase === 0 ? '#f55656' : '#2ee6d6';
    return (
      <main
        style={{ backgroundColor }}
        className="pt-dark"
      >
        {this.props.children}
      </main>
    );
  }
}

App.propTypes = {
  currentPhase: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  pushRoute: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase
});

const mapDispatchToProps = (dispatch) => ({
  pushRoute: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
