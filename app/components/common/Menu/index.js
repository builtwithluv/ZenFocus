import { connect } from 'react-redux';

import { resetSession } from 'common/Rounds/actions';

import Menu from 'common/Menu/menu';

const mapStateToProps = state => ({
  theme: state.app.theme
});

const mapDispatchToProps = dispatch => ({
  resetSession: () => dispatch(resetSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
