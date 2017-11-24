import { ReduxBase } from './../../../redux/ReduxBase';
import { actionCreators } from './../../../redux/counter/actions';
import { StateWithHistory, ActionCreators } from 'redux-undo';
import { Unsubscribe } from 'redux'
import store from '../../../redux/store';
import { RootState } from 'redux/root-reducer';
import { createSelector } from "reselect";
import { getSfcCounter } from 'redux/counter/selectors';

const counterState = createSelector(
    getSfcCounter,
    (counter) => counter
  );

export class CounterRedux extends ReduxBase<number> {    
  //state: StateWithHistory<RootState>;
  counter: number;
  unsubscribe: Unsubscribe;
 
  constructor() {
      super(counterState);
      //this.state = store.getState();

      //this.counter = counterState(store.getState().present);
  }

  public incrementCounter() {
    this.dispatch(actionCreators.incrementSfc(1));
    //this.currentCount++;
}

public decrementCounter() {
    this.dispatch(actionCreators.decrementSfc(1));
    //this.currentCount++;
}

public callServer()
{
    this
    .dispatch(actionCreators.incrementSfcAsync(10))
    .then(() => console.log(store.getState()))
}

//   update()
//   {
//       //const newState = store.getState();
      
//       this.counter = counterState(store.getState().present);
//   }

//   attached() {
//     this.unsubscribe = store.subscribe(this.update.bind(this));
//   }

//   detached() {
//     this.unsubscribe();
//   }
}