import * as types from '../constant/constant';
const initialState = {};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PRODUCT_DETAIL: {
      state = action.product;
      return state;
    }
    default: return state;
  }
};

export default myReducer;