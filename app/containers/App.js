import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import settings from 'electron-settings';
import {
  LOAD_CHARTS,
  LOAD_SETTINGS
} from '../events';
import {
  loadRoundsData
} from '../components/common/Rounds/actions';
import {
  loadChartData
} from '../components/Charts/actions';

class App extends PureComponent {
  componentWillMount() {
    const { pushRoute } = this.props;
    ipcRenderer.on(LOAD_CHARTS, () => pushRoute('/charts'));
    ipcRenderer.on(LOAD_SETTINGS, () => pushRoute('/settings'));
    this.loadSavedData();
  }

  loadSavedData() {
    const {
      setChartData,
      setRoundsData
    } = this.props;
    const data = settings.getAll();

    const { chart = {}, rounds = {} } = data;
    setChartData(chart);
    setRoundsData(rounds);
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
  setChartData: PropTypes.func.isRequired,
  setRoundsData: PropTypes.func.isRequired,
  pushRoute: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  setChartData: (data) => dispatch(loadChartData(data)),
  setRoundsData: (data) => dispatch(loadRoundsData(data)),
  pushRoute: (route) => dispatch(push(route))
});

export default connect(null, mapDispatchToProps)(App);
