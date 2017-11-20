import { rootReducer } from './root-reducer';
import { createLogger } from 'redux-logger'
import thunkMiddleware  from "redux-thunk";
import { createStore, applyMiddleware, compose } from 'redux';
import  enviroment  from "../environment";
import undoable, { ActionCreators, StateWithHistory } from 'redux-undo';
import { RootState } from 'redux/root-reducer';


const composeEnhancers = (
    enviroment.debug &&  window && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ) || compose;
    
    function configureStore(initialState?: StateWithHistory<RootState>) {
      // configure middlewares
      const loggerMiddleware = createLogger()
      
      const middlewares = [
          loggerMiddleware,
          thunkMiddleware
      ];
      // compose enhancers
      const enhancer = composeEnhancers(
        applyMiddleware(...middlewares),
      );
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