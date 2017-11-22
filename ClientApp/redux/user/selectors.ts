import { createSelector } from 'reselect';
import { RootState } from './../root-reducer';
export const getUser =
(state: RootState) => state.user;


export const getActiveUser = createSelector(
getUser,
(user) => user)