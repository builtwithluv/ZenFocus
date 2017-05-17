import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import settings from 'electron-settings';
import {
  LOAD_SETTINGS
} from '../events';
import {
  loadRoundsData
} from '../components/common/Rounds/actions';

class App extends PureComponent {
  componentWillMount() {
    const { pushRoute } = this.props;
    ipcRenderer.on(LOAD_SETTINGS, () => pushRoute('/settings'));
    this.loadSavedData();
  }

  loadSavedData() {
    const { loadRoundsData: _loadRoundsData } = this.props;
    const data = settings.getAll();

    const { rounds = {} } = data;
    _loadRoundsData(rounds);
  }

  render() {
    return (
      <main className="pt-dark">
        {this.props.children}
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  loadRoundsData: PropTypes.func.isRequired,
  pushRoute: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  loadRoundsData: (data) => dispatch(loadRoundsData(data)),
  pushRoute: (route) => dispatch(push(route))
});

export default connect(null, mapDispatchToProps)(App);
