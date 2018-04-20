import * as actionTypes from './actions';

const initialState = {
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.value
      };
    default:
      return state
  }
};

export default reducer;