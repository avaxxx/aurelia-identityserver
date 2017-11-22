import { UserManager } from 'oidc-client';
import { Action } from './../../../../typings/redux.d';
import {OpenIdConnect} from 'aurelia-open-id-connect';
import { autoinject } from "aurelia-framework";
import { createStore, Store, Unsubscribe, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware  from "redux-thunk";
import enviroment from "../../../environment";
import * as NProgress from "nprogress";
import { Reducer } from 'redux';
import undoable, { ActionCreators, StateWithHistory } from 'redux-undo';
@autoinject
export class Counter {
    store: Store<StateWithHistory<{}>>;
    state: any;
    unsubscribe: Unsubscribe;

    //  enhancer = window['devToolsExtension'] ? window['devToolsExtension']()(createStore) : createStore;
     //store: IStore<any> = enhancer(rootReducer, initialState);

    constructor(private userManager: UserManager)
    {

        //this.store = createStore(App,  (<any>window).__REDUX_DEVTOOLS_EXTENSION__ && (<any>window).__REDUX_DEVTOOLS_EXTENSION__());
        this.store = configureStore(App, initialState);
        this.unsubscribe = this.store.subscribe(this.update.bind(this));
        this.state = initialState;
    }

    update()
    {
        const newState = this.store.getState();
        
        this.state = newState;
    }

    public currentCount = 0;

    public incrementCounter() {
        this.store.dispatch(Increment());
        //this.currentCount++;
    }

    public decrementCounter() {
        this.store.dispatch(Decrement());
        //this.currentCount++;
    }

    public callServer()
    {
        this.store
        .dispatch(fetchValue(20))
        .then(() => console.log(this.store.getState()))
    }

    public undo()
    {
        this.store.dispatch(ActionCreators.undo())
    }

    public redo()
    {
        this.store.dispatch(ActionCreators.redo())
    }

    detached()
    {
        this.unsubscribe();
    }

    logout()
    {
        // this.userManager.signoutRedirect();
        this.userManager.createSignoutRequest().then((request) => console.log(request));
        //this.userManager.signoutPopup();
    }
}

const composeEnhancers = (
  enviroment.debug &&  window && (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;
  
  function configureStore(reducer: any, initialState?: any) {
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
      undoable(reducer),
      initialState!,
      enhancer,
    );
  }

const INCREMENT = "Increment";
const DECREMENT = "Decrement";
const REQUEST_VALUE = 'REQUEST_VALUE'
const RECEIVE_VALUE = 'RECEIVE_VALUE'
//Actions

function Increment(value = 1)
{
    return {type: INCREMENT, value: value};
}

function Decrement(value = 1)
{
    return {type: DECREMENT, value: value};
}

function requestValue(value = 1) {
    return {
      type: REQUEST_VALUE,
      value
    }
  }
  
  function receiveValue(value, json) {
    return {
      type: RECEIVE_VALUE,
      value,
      response: json,
      receivedAt: Date.now()
    }
  }

  function fetchValue(value) {
    return dispatch => {
      dispatch(requestValue(value))
      return fetch(`/api/redux?value=${value}`)
        .then(response => response.json())
        .then(json => dispatch(receiveValue(value, json)))
    }
  }

type CounterState = {
        value: number,
        isFetching: boolean,
        receivedAt: number,
        response: object,
        status: boolean
}

const initialState : CounterState =
{
    value: 0,
    isFetching: false,
    receivedAt: Date.now(),
    response: null,
    status: false
};

function App(state = initialState, action)
{
    switch(action.type)
    {
        case INCREMENT:
        {
            return {...state, value: state.value + 1};
            //return Object.assign({}, state, {value: state.value + 1});
        }
        case DECREMENT:
        {
            return {...state, value: state.value - 1};
            //return Object.assign({}, state, {value: state.value - 1});
        }
        case REQUEST_VALUE:
        NProgress.inc();
        return Object.assign({}, state, {
            isFetching: true,
          })
        case RECEIVE_VALUE:
        NProgress.done();
        NProgress.remove();
          return Object.assign({}, state, {
            isFetching: false,
            value: state.value + action.response.value,
            status: action.response.isSuccess,
            receivedAt: action.receivedAt,
            response: action.response
          })
        default:
            return state;
    }

}