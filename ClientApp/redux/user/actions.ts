
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export type Actions = {
    LOGIN: {
      type: typeof LOGIN,
      user: Oidc.User
    },
    LOGOUT: {
      type: typeof LOGOUT
    },
  };
  
  // Action Creators
  export const actionCreators = {
    login: (user: Oidc.User): Actions[typeof LOGIN] => ({
      type: LOGIN,
      user: user
    }),
    logout: (): Actions[typeof LOGOUT] => ({
      type: LOGOUT
    }),
  };