import { connect } from 'react-redux';

import GenAlerts from 'common/GeneralAlerts/general-alerts';
import { closeGeneralAlert } from 'common/GeneralAlerts/actions';

const mapStateToProps = state => ({
  cancelText: state.genAlerts.cancelText,
  confirmText: state.genAlerts.confirmText,
  intent: state.genAlerts.intent,
  isOpen: state.genAlerts.isOpen,
  message: state.genAlerts.message,
  onConfirm: state.genAlerts.onConfirm
});

const mapDispatchToProps = dispatch => ({
  closeGeneralAlert: () => dispatch(closeGeneralAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(GenAlerts);
