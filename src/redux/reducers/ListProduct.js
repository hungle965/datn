import * as types from '../constant/constant'
import {findIndex} from 'lodash';

const initialState = [ ];

const myReducer = (state = initialState, action) => {
     switch (action.type) {
          case types.LIST_ALL:
               return state;

          case types.EDIT_PRODUCT:{
               const index = findIndex(state , product => {
                    return product.id === action.product.id
               });
               state[index]=action.product;
               return [...state];
          }

          case types.REMOVE_PRODUCT:{
               const index = findIndex(state , product => {
                    return product.id === action.id
               });
               state.splice(index,1)
               return [...state];
          }

          // api

          case types.FETCH_PRODUCTS: {
               state = action.products
               return [...state];
          }

          case types.ADD_PRODUCT: {
               state.push(action.product);
               return [...state];
          }

          case types.DELETE_PRODUCT: {
               const index = findIndex(state , product => {
                    return product.id === action.id
               });
               state.splice(index,1);
               return [...state];
          }

          case types.UPDATE_PRODUCT: {
               const index = findIndex(state , product => {
                    return product.id === action.product.id
               });
               state[index]=action.product;
               return [...state];
          }

          default: return state;
     }
};

export default myReducer;