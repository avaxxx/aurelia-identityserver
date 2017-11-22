import store from "./store";

const connect = (viewModel, stateMapper) => {
  stateMapper = stateMapper || ((state) => state.present);
  const state = store.getState();
  const dispatch = store.dispatch;
  let stateToShallowCompare;

  const inject = (mappedState) => {
    viewModel.state = mappedState;
    viewModel.dispatch = dispatch;

    stateToShallowCompare = Object.assign({}, viewModel.state);
  };
  const subscribe = () => {
    const newMappedState = stateMapper(store.getState());
    if (!stateToShallowCompare.equals(newMappedState)) {
      inject(newMappedState);
    }
  };
  const unsubscribe = store.subscribe(subscribe);
  const originalDetached = viewModel.detached || (() => {}); 
  viewModel.detached = () => {
    originalDetached();
    unsubscribe();
  };

  inject(stateMapper(state.present));
};


export default connect;