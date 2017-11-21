export const INCREMENT_SFC = 'INCREMENT_SFC';
export const DECREMENT_SFC = 'DECREMENT_SFC';
export const INCREMENT_SFC_ASYNC = 'INCREMENT_SFC_ASYNC';
export const INCREMENT_SFC_ASYNC_REQUEST = 'INCREMENT_SFC_ASYNC_REQUEST';
export const INCREMENT_SFC_ASYNC_RESPONSE = 'INCREMENT_SFC_ASYNC_RESPONSE';

export type Actions = {
  INCREMENT_SFC: {
    type: typeof INCREMENT_SFC,
    value: number
  },
  DECREMENT_SFC: {
    type: typeof DECREMENT_SFC,
    value: number
  },
  INCREMENT_SFC_ASYNC_REQUEST: {
    type: typeof INCREMENT_SFC_ASYNC_REQUEST,
    userId: number
  },
  INCREMENT_SFC_ASYNC_RESPONSE: {
    type: typeof INCREMENT_SFC_ASYNC_RESPONSE,
    value: number
  },
  INCREMENT_SFC_ASYNC: any
};

// Action Creators
export const actionCreators = {
  incrementSfc: (inputValue = 1): Actions[typeof INCREMENT_SFC] => ({
    type: INCREMENT_SFC,
    value: inputValue
  }),
  decrementSfc: (inputValue = 1): Actions[typeof DECREMENT_SFC] => ({
    type: DECREMENT_SFC,
    value: inputValue
  }),
  incrementSfcAsync: (value = 1) => 
  dispatch =>{
    return fetch(`/api/redux?value=${value}`)
    .then(response => response.json())
    .then(json => 
      {
        console.log(json);
        dispatch(actionCreators.incrementSfc(json.value));
      })
  }
};