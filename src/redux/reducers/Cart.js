import * as types from '../constant/constant';
import { findIndex } from 'lodash';

const cart = JSON.parse(sessionStorage.getItem('cart'));

const initialState = cart ? cart : [];

const myReducer = (state = initialState, action) => {
     switch (action.type) {
          case types.CART: {
               let isHaveItem = false;
               state.forEach(product => {
                    if (product.id === action.product.id) isHaveItem = true;
               });
               if (isHaveItem === false) {
                    console.log(action.product);
                    const newProduct = {
                         id: action.product.id,
                         name: action.product.name,
                         price: action.product.price,
                         quantity: 1,
                         slug: action.product.slug,
                         desc: action.product.desc,
                         speciesId: action.product.speciesId,
                         urlPhoto: action.product.urlPhoto,
                         accountID: action.product.accountID,
                         orderQuantity: action.product.orderQuantity
                    };
                    state.push(newProduct);
               } else {
                    let index = findIndex(state, product => {
                         return product.id = action.product.id;
                    })
                    state[index].quantity++;
               }
               sessionStorage.setItem('cart', JSON.stringify(state));
               return [...state];
          }
          case types.INCREASING: {
               let id = action.id;
               let index = findIndex(state, (item) => {
                    return item.id === id
               });
               state[index].quantity = state[index].quantity + 1;
               sessionStorage.setItem('cart', JSON.stringify(state));
               return [...state];
          }
          case types.REDUCTION: {
               let id = action.id;
               let index = findIndex(state, (item) => {
                    return item.id === id
               });
               state[index].quantity = state[index].quantity >= 1 ? state[index].quantity - 1 : 0;
               sessionStorage.setItem('cart', JSON.stringify(state));
               return [...state];
          }
          case types.REMOVE_ITEM_CART: {
               let id = action.id;
               let index = findIndex(state, (item) => {
                    return item.id === id
               });
               state.splice(index, 1);
               sessionStorage.setItem('cart', JSON.stringify(state));
               return [...state];
          }
          case types.CART_COMPLETE: {
               state = [];
               return [...state];
          }
          default: return state;
     }
};

export default myReducer;
