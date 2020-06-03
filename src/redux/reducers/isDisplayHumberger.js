import * as types from '../constant/constant'

const initialState = 0;

const myReducer =  (state = initialState , action) =>{
     switch(action.type){
          case types.TOGGLE_HUMBERGER:
               const isDisplay = state === 0 ? 1 : 0;
               return isDisplay;
          default: return state;
     }
};

export default myReducer;