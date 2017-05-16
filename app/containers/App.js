import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class App extends Component {
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
  children: PropTypes.element.isRequired
};

const mapStateToProps = (state) => ({
  currentPhase: state.rounds.currentPhase
});

export default connect(mapStateToProps)(App);
