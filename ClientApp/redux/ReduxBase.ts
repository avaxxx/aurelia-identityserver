import { ActionCreators } from 'redux-undo';
import { Unsubscribe } from 'redux';
import store from "./store";
export class ReduxBase<T>
{
    state: T;
    unsubscribe: Unsubscribe;
    selector: any;

    constructor(selector)
    {
        this.selector = selector;
        this.state = selector(store.getState().present);
    }

    update()
    {
        this.state = this.selector(store.getState().present);        
    }

    dispatch(action): any
    {
        store.dispatch(action);
    }

    public undo()
    {
      this.dispatch(ActionCreators.undo())
    }
    
    public redo()
    {
      this.dispatch(ActionCreators.redo())
    }

    attached() {
        this.unsubscribe = store.subscribe(this.update.bind(this));
    }

    detached() {
        this.unsubscribe();
    }
}