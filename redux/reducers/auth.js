import { SET_DATA_USER } from '../actionTypes';

const initialState = {
  dataUser: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_USER:
      return {
        ...state,
        dataUser: action.payload
      }
    default:
      return state;
  }
}

export default reducer;