import { ITodo } from './../../../redux/todo/types';
import { getSfcCounter } from 'redux/counter/selectors';
import { getFilteredTodos } from './../../../redux/todo/selectors';
import { actionCreators } from './../../../redux/todo/actions';
import { StateWithHistory, ActionCreators } from 'redux-undo';
import { Unsubscribe } from 'redux'
import store from '../../../redux/store';
import { RootState } from 'redux/root-reducer';

export class Todos {    
  state: StateWithHistory<RootState>;
  unsubscribe: Unsubscribe;
  todos: ITodo[];

  constructor() {
      this.state = store.getState();
      this.todos = getFilteredTodos(store.getState().present);
  }

  add(value){
    store.dispatch(actionCreators.addTodo(value));
  }

  sort()
  {
    store.dispatch(actionCreators.changeFilter("active"));
  }

  public undo()
  {
      store.dispatch(ActionCreators.undo())
  }
  
  public redo()
  {
      store.dispatch(ActionCreators.redo())
  }
  
  
    update()
    {
        const newState = store.getState();
        
        this.state = newState;
        this.todos = getFilteredTodos(newState.present);
    }
  
    attached() {
      this.unsubscribe = store.subscribe(this.update.bind(this));
    }
  
    detached() {
      this.unsubscribe();
    }
  }