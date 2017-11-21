import { actionCreators } from './../../../redux/todo/actions';
import { StateWithHistory, ActionCreators } from 'redux-undo';
import { Unsubscribe } from 'redux'
import store from '../../../redux/store';
import { RootState } from 'redux/root-reducer';

export class Todos {    
  state: StateWithHistory<RootState>;
  unsubscribe: Unsubscribe;

  constructor() {
      this.state = store.getState();
  }

  add(value){
    store.dispatch(actionCreators.addTodo(value));
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
    }
  
    attached() {
      this.unsubscribe = store.subscribe(this.update.bind(this));
    }
  
    detached() {
      this.unsubscribe();
    }
  }