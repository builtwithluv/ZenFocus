import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Main from './main-page';

const mapDispatchToProps = (dispatch) => ({
  pushRoute: (route) => dispatch(push(route))
});

export default connect(null, mapDispatchToProps)(Main);
