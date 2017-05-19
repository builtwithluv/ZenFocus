import { connect } from 'react-redux';
import settings from 'electron-settings';
import Charts from './charts';
import {
  loadChartData
} from './actions';

const mapStateToProps = (state) => ({
  data: state.charts.data
});

const mapDispatchToProps = (dispatch) => ({
  loadChartData: () => {
    const chartData = settings.get('chart', []);
    dispatch(loadChartData(chartData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
