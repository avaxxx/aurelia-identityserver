import { combineReducers } from 'redux';

import { reducer as counters, State as CountersState } from './counter';
// import { reducer as todos, State as TodosState } from '@src/redux/todos';

import { RootAction } from "./root-action";

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
  counters: CountersState,
//   todos: TodosState,
}


export const rootReducer = combineReducers<RootState,RootAction>({
  counters,
//   todos,
});