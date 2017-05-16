import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from '@blueprintjs/core';

class Settings extends PureComponent {
  onCloseClick() {
    this.props.goToMain();
  }

  render() {
    return <Button iconName="cross" onClick={() => this.onCloseClick()} />;
  }
}

Settings.propTypes = {
  goToMain: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(push('/'))
});

export default connect(null, mapDispatchToProps)(Settings);
