import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog } from '@blueprintjs/core';

const Feedback = ({ showFeedback, closeFeedback, onGiveFeedbackClick }) => (
  <div>
    <Button
      text="Give Feedback"
      onClick={onGiveFeedbackClick}
      className="fixed-bottom m-1 bg-yellow text-black font-weight-bold"
    />
    <Dialog
      title=""
      isOpen={showFeedback}
      onClose={closeFeedback}
      className="h-60 w-50"
    >
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSccbcfGtY6MpQeRM2hYQ-Xzji6TDKnG9Mcr_1fluDQCU0JoTA/viewform?embedded=true"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        Please wait while we generate your form.
      </iframe>
    </Dialog>
  </div>
);

Feedback.propTypes = {
  showFeedback: PropTypes.bool.isRequired,
  closeFeedback: PropTypes.func.isRequired,
  onGiveFeedbackClick: PropTypes.func.isRequired
};

export default Feedback;
