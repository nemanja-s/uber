import * as actionTypes from './actions';

const initialState = {
  isAuthenticated: false,
  tasks: [],
  id: 11
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.value
      };
    case actionTypes.SET_TASKS:
      return {
        ...state,
        tasks: action.value
      };
    case actionTypes.SET_ID:
      return {
        ...state,
        id: action.value
      };
    default:
      return state
  }
};

export default reducer;