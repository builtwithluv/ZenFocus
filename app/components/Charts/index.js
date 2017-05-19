import { connect } from 'react-redux';
import Charts from './charts';

const mapStateToProps = (state) => ({
  data: state.charts.data
});

export default connect(mapStateToProps)(Charts);
