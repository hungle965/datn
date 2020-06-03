import * as types from '../constant/constant';
const initialState = {};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_DETAIL:{
      state=action.user;
      return state;
    }
    default: return state;
  }
};

export default myReducer;