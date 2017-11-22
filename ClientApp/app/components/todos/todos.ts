import { ReduxBase } from './../../../redux/ReduxBase';
import { ITodo } from './../../../redux/todo/types';
import { getSfcCounter } from 'redux/counter/selectors';
import { getFilteredTodos } from './../../../redux/todo/selectors';
import { actionCreators } from './../../../redux/todo/actions';
import { StateWithHistory, ActionCreators } from 'redux-undo';
import { Unsubscribe } from 'redux'
import store from '../../../redux/store';
import { RootState } from 'redux/root-reducer';

export class Todos extends ReduxBase<ITodo[]>  {    
  // state: StateWithHistory<RootState>;
  // unsubscribe: Unsubscribe;
  // todos: ITodo[];

  constructor() {
     super(getFilteredTodos);
      // this.state = store.getState();
      // this.todos = getFilteredTodos(store.getState().present);
  }

  add(value){
    this.dispatch(actionCreators.addTodo(value));
  }

  sort()
  {
    this.dispatch(actionCreators.changeFilter("active"));
  }


  
  
    // update()
    // {
    //     const newState = store.getState();
        
    //     this.state = newState;
    //     this.todos = getFilteredTodos(newState.present);
    // }
  
    // attached() {
    //   this.unsubscribe = store.subscribe(this.update.bind(this));
    // }
  
    // detached() {
    //   this.unsubscribe();
    // }
  }