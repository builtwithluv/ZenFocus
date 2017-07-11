import { connect } from 'react-redux';

import { resetRound, resetSession } from 'common/Rounds/actions';

import Menu from 'common/Menu/menu';

const mapStateToProps = state => ({
  theme: state.app.theme
});

const mapDispatchToProps = dispatch => ({
  resetRound: () => dispatch(resetRound()),
  resetSession: () => dispatch(resetSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
