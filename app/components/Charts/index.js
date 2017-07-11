import { connect } from 'react-redux';
import settings from 'electron-settings';

import { loadChartData } from 'Charts/actions';

import Charts from 'Charts/charts';

const mapStateToProps = state => ({
  data: state.charts.data,
  theme: state.app.theme
});

const mapDispatchToProps = dispatch => ({
  loadChartData: () => {
    const chartData = settings.get('chart', []);
    dispatch(loadChartData(chartData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
