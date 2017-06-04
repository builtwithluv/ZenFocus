import { connect } from 'react-redux';
import PrivateRoute from './private-route';

const mapStateToProps = state => ({
  route: state.router.location.pathname
});

export default connect(mapStateToProps)(PrivateRoute);
