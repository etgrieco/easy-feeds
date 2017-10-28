import { combineReducers } from 'redux';

const initialState = [];
const loadingMessagesReducer = (state = initialState, action) => {
  Object.freeze(state);

  if (action.type.slice(0, 6) === "START_") {
    return action.messages;
  }
  else if (action.type.slice(0, 8) === "RECEIVE_") {
    return [];
  } else {
    return state;
  }
};

const loadingReducer = combineReducers({
  messages: loadingMessagesReducer
});

export default loadingReducer;
