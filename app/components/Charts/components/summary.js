import React from 'react';
import PropTypes from 'prop-types';

const Summary = ({ data }) => {
  const sessions = Object.keys(data).length;
  const focusLength = data.reduce((sum, session) => sum + (session.focusLength || 0), 0);
  const longBreakLength = data.reduce((sum, session) => sum + (session.longBreakLength || 0), 0);
  const shortBreakLength = data.reduce((sum, session) => sum + (session.shortBreakLength || 0), 0);

  return (
    <div className="d-flex justify-content-around font-small">
      <div>Sessions: {sessions}</div>
      <div>Total Focus: {focusLength} minutes</div>
      <div>Total Short Break: {shortBreakLength} minutes</div>
      <div>Total Long Break: {longBreakLength} minutes</div>
    </div>
  );
};

Summary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      focusLength: PropTypes.number,
      shortBreakLength: PropTypes.number,
      longBreakLength: PropTypes.number,
      rounds: PropTypes.number
    })
  ).isRequired
};

export default Summary;
