import * as actionTypes from './actions';

const initialState = {
  isAuthenticated: false,
  tasks: [],
  addedTasks: [],
  id: 11,
  selectedTaskId: null,
  users: [],
  selectedUserId: null
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
    case actionTypes.ADDING_TASK:
      return {
        ...state,
        addedTasks: action.value
      };
    case actionTypes.SELECT_TASK_ID:
      return {
        ...state,
        selectedTaskId: action.value
      };
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.value
      };
    case actionTypes.SELECT_USER:
      return {
        ...state,
        selectedUserId: action.value
      };
    default:
      return state
  }
};

export default reducer;