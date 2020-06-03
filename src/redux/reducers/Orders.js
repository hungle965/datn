import * as types from '../constant/constant';
import { findIndex } from 'lodash';

const initialState = [];
const myReducer = (state = initialState, action) => {
     switch (action.type) {
          case types.FETCH_ORDERS: {
               state = action.orders;
               return [...state];
          }
          case types.ADD_ORDER: {
               state.push(action.order);
               return [...state];
          }
          case types.UPDATE_ORDER: {
               const index = findIndex(state, order => {
                    return order.id === action.order.id
               });
               state[index] = action.order;
               return [...state];
          }
          default: return state;
     }
};

export default myReducer;