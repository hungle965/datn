import * as types from '../constant/constant'
const initialState = {};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ORDER_DETAIL:
      state = action.order;
      return state;
    default: return state;
  }
};
export default myReducer;