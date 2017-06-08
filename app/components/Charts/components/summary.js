import React from 'react';
import _ from 'lodash';

const Summary = ({ data }) => {
  const sessions = _.keys(data).length;
  const focusLength = _.reduce(data, (sum, session) => sum + session.focusLength, 0);
  const longBreakLength = _.reduce(data, (sum, session) => sum + session.longBreakLength, 0);
  const shortBreakLength = _.reduce(data, (sum, session) => sum + session.shortBreakLength, 0);

  return (
    <nav>
      <div className="pt-navbar-group pt-align-center" style={{fontSize:"13"}}>
        <div style={{margin:"0 auto"}}>Sessions: {sessions}</div>
        <div style={{marginLeft:"10", margin: "0 auto"}}>Total Focus: {focusLength ? focusLength : 0} minutes</div>
        <div style={{marginLeft:"10", margin: "0 auto"}}>Total Short Break: {shortBreakLength ? shortBreakLength : 0} minutes</div>
        <div style={{marginLeft:"10", margin: "0 auto"}}>Total Long Break: {longBreakLength ? longBreakLength : 0} minutes</div>
      </div>
    </nav>
  );
}

export default Summary;
