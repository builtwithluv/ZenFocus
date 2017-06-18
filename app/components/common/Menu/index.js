import { connect } from 'react-redux';
import Menu from './menu';
import { resetRound, resetSession } from '../Rounds/actions';

const mapDispatchToProps = dispatch => ({
  resetRound: () => dispatch(resetRound()),
  resetSession: () => dispatch(resetSession())
});

export default connect(null, mapDispatchToProps)(Menu);
