import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Main from './main-page';
import {
  pause,
  resume
} from '../common/MediaControls/actions';

const mapStateToProps = (state) => ({
  isPlaying: state.mediaControls.isPlaying
});

const mapDispatchToProps = (dispatch) => ({
  pause: () => dispatch(pause()),
  pushRoute: (route) => dispatch(push(route)),
  resume: () => dispatch(resume())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
