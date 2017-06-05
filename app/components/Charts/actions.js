import { LOAD_CHART_DATA } from './types';

export const loadChartData = data => ({
  type: LOAD_CHART_DATA,
  data
});
