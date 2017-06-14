import { connect } from 'react-redux';
import Menu from './menu';
import { resetRound, resetSession } from '../Rounds/actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  resetRound: () => dispatch(resetRound()),
  resetSession: () => dispatch(resetSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
