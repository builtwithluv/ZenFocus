import { connect } from 'react-redux';
import settings from 'electron-settings';

import Charts from 'components/Charts/charts';

import { loadChartData } from 'components/Charts/actions';

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
