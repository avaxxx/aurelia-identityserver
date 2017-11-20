export const INCREMENT_SFC = 'INCREMENT_SFC';
export const DECREMENT_SFC = 'DECREMENT_SFC';

export type Actions = {
  INCREMENT_SFC: {
    type: typeof INCREMENT_SFC,
    value: number
  },
  DECREMENT_SFC: {
    type: typeof DECREMENT_SFC,
    value: number
  },
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
};