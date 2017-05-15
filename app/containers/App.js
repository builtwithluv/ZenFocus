import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div className="pt-dark">
        {this.props.children}
      </div>
    );
  }
}
