import { RootAction } from './root-action';
import { rootReducer, RootState } from './root-reducer';
import { createLogger } from 'redux-logger'
import thunkMiddleware  from "redux-thunk";
import { createStore, applyMiddleware, compose, Reducer } from 'redux';
import  enviroment  from "../environment";
import undoable, { ActionCreators, StateWithHistory, includeAction, excludeAction } from 'redux-undo';
import { LOGIN, LOGOUT } from "./user/actions";
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import { UserManager } from 'oidc-client';


const composeEnhancers = (
    enviroment.debug &&  window && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ) || compose;
    
    function configureStore(initialState?: StateWithHistory<RootState>) {
      // configure middlewares
      const loggerMiddleware = createLogger()
      
      // const reducer = storage.reducer(rootReducer); 
      const engine = createEngine('application-state');
      const storageMiddleware = storage.createMiddleware(engine);

      const middlewares = [
          loggerMiddleware,
          thunkMiddleware,
          storageMiddleware
      ];


      // compose enhancers
      const enhancer = composeEnhancers(
        applyMiddleware(...middlewares),
      );

   
      if (localStorage.getItem('application-state') !== null)
        initialState = JSON.parse(localStorage.getItem('application-state'));

      // create store
      return createStore(
        undoable(rootReducer),
        initialState!,
        enhancer,
      );
    }

    // pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;