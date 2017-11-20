import { actionCreators } from './../../../redux/counter/actions';
import { StateWithHistory, ActionCreators } from 'redux-undo';
import { Unsubscribe } from 'redux'
import store from '../../../redux/store';
import { RootState } from 'redux/root-reducer';

export class CounterRedux {    
  state: StateWithHistory<RootState>;
  unsubscribe: Unsubscribe;
  
  constructor() {
      this.state = store.getState();
  }

  public incrementCounter() {
    store.dispatch(actionCreators.incrementSfc(1));
    //this.currentCount++;
}

public decrementCounter() {
    store.dispatch(actionCreators.decrementSfc(1));
    //this.currentCount++;
}

// public callServer()
// {
//     this.store
//     .dispatch(fetchValue(20))
//     .then(() => console.log(this.store.getState()))
// }

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