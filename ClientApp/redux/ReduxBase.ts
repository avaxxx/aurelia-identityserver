import { ActionCreators } from 'redux-undo';
import { Unsubscribe } from 'redux';
import store from "./store";
import {State as UserState} from './user/reducer'
import { getActiveUser } from "./user/selectors";
export class ReduxBase<T>
{
    state: T;
    unsubscribe: Unsubscribe;
    selector: any;
    user: UserState;

    constructor(selector)
    {
        this.selector = selector;
        this.state = selector(store.getState().present);
        this.user = getActiveUser(store.getState().present);
    }

    update()
    {
        const newState = store.getState().present;
        this.state = this.selector(newState);     
        if (newState.user.user !== this.user.user)
            this.user = getActiveUser(store.getState().present); 
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