import { connect } from 'react-redux';
import PrivateRoute from 'common/PrivateRoute/private-route';

const mapStateToProps = state => ({
  route: state.router.location.pathname
});

export default connect(mapStateToProps)(PrivateRoute);
