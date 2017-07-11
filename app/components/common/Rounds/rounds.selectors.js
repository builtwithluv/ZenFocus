import { createSelector } from 'reselect';

import { rounds } from 'selectors/common.selectors';

export const minutes = createSelector(rounds, ({ minutes: m }) => m);
export const seconds = createSelector(rounds, ({ seconds: s }) => s);
