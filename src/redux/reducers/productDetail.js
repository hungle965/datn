import * as types from '../constant/constant';

const initialState = {
     id: '',
     name: '',
     price: '',
     desc: '',
     speciesId: '',
     urlPhoto: '',
     accountID: '',
}

const myReducer = (state = initialState, action) => {
     switch (action.type) {
          case types.PRODUCT_DETAIL:
               state = action.product;
               return state;
          default: return state;
     }
};
export default myReducer;