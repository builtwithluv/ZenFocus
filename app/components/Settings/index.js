import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Settings from './settings';

const mapDispatchToProps = (dispatch) => ({
  goToMain: () => dispatch(push('/'))
});

export default connect(null, mapDispatchToProps)(Settings);
