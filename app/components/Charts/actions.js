import { LOAD_CHART_DATA } from 'components/Charts/types';

export const loadChartData = data => ({
  type: LOAD_CHART_DATA,
  data
});
