import { RootState } from './../root-reducer';

export const getSfcCounter =
  (state: RootState) => state.counters.sfcCounter;