import * as types from './../constant/constant'

const initialState = 'orders';

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_PAGE:{
      state = action.value;
      return state
    }
    default: return state;
  }
};

export default myReducer;