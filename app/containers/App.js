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
    return (
      <main className="pt-dark">
        {this.props.children}
      </main>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  pushRoute: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  pushRoute: (route) => dispatch(push(route))
});

export default connect(null, mapDispatchToProps)(App);
