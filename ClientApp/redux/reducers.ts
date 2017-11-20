import  {actionCreators}  from './actioncreators';

export type State =
{
    readonly value: number,
    readonly isFetching: boolean,
    readonly receivedAt: number,
    readonly response: object,
    readonly status: boolean
};

export const initialState : State = {
    value: 0,
    isFetching: false,
    receivedAt: Date.now(),
    response: null,
    status: false
}


export class Reducers{
    constructor()
    {
    }
}