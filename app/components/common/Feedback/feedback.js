import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@blueprintjs/core';

const Feedback = ({ showFeedback, url, closeFeedback }) => (
  <Dialog
    title=""
    isOpen={showFeedback}
    onClose={closeFeedback}
    className="h-60 w-50"
  >
    <iframe
      title="Feedback"
      src={url}
      width="100%"
      height="100%"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
    >
      Please wait while we generate your form.
    </iframe>
  </Dialog>
);

Feedback.propTypes = {
  showFeedback: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  closeFeedback: PropTypes.func.isRequired
};

export default Feedback;
