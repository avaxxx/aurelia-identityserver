import { combineReducers } from 'redux';

import { RootAction } from '../root-action';


import {
  LOGIN,
  LOGOUT,
} from './actions';

export type State = {
  readonly user: 
  {
      readonly user: Oidc.User,
      readonly isLoggedIn: boolean
  }
};

export const reducer = combineReducers<State, RootAction>({
  user: (state = null, action) => {
    switch (action.type) {
      case LOGIN:
        return {...state, user: action.user, isLoggedIn: true};
      case LOGOUT:
        localStorage.removeItem('application-state');
        return null;
      default:
        return state;
    }
  },
});