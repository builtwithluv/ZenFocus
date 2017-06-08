import React from 'react';

const Summary = ({ data }) => {
  const { fontStyle, fslDiv, sessionDiv } = styles;
  const sessions = Object.keys(data).length;
  const focusLength = data.reduce((sum, session) => sum + session.focusLength, 0);
  const longBreakLength = data.reduce((sum, session) => sum + session.longBreakLength, 0);
  const shortBreakLength = data.reduce((sum, session) => sum + session.shortBreakLength, 0);

  return (
    <nav>
      <div className="pt-navbar-group pt-align-center" style={fontStyle}>
        <div style={sessionDiv}>Sessions: {sessions}</div>
        <div style={fslDiv}>Total Focus: {focusLength ? focusLength : 0} minutes</div>
        <div style={fslDiv}>Total Short Break: {shortBreakLength ? shortBreakLength : 0} minutes</div>
        <div style={fslDiv}>Total Long Break: {longBreakLength ? longBreakLength : 0} minutes</div>
      </div>
    </nav>
  );
}

const styles = {
  fontStyle: {
    fontSize: "13"
  },
  fslDiv: {
    marginLeft: "10",
    margin: "0 auto"
  },
  sessionDiv: {
    margin: "0 auto"
  }
};

export default Summary;
