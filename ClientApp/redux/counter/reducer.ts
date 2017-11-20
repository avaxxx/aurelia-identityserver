import { combineReducers } from 'redux';

import { RootAction } from '../root-action';


import {
  INCREMENT_SFC,
  DECREMENT_SFC,
} from './actions';

export type State = {
  readonly sfcCounter: number,
};

export const reducer = combineReducers<State>({
  sfcCounter: (state = 0, action : RootAction) => {
    switch (action.type) {
      case INCREMENT_SFC:
        return state + 1;

      case DECREMENT_SFC:
        return state - 1;

      default:
        return state;
    }
  },
});
