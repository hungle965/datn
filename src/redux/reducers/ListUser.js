import * as types from '../constant/constant';
import { findIndex } from 'lodash';


const initialState = [];
const myReducer = (state = initialState, action) => {
     switch (action.type) {
          case types.LIST_USER:
               return state;
          // api

          case types.FETCH_USERS: {
               state = action.users;
               return [...state];
          }

          case types.UPDATE_USER: {
               const index = findIndex(state, user => {
                    return user.id === action.user.id
               });
               state[index] = action.user;
               return [...state];
          }

          case types.ADD_USER: {
               state.push(action.user);
               return [...state];
          }

          default: return state;
     }
};

export default myReducer;