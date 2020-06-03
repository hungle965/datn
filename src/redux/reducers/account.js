import * as types from '../constant/constant'
const sessionAccount = JSON.parse(sessionStorage.getItem('account'));

const initialState = sessionAccount ? sessionAccount :
     {
          id: '',
          userName: '',
          name: '',
          passWord: '',
          email: '',
          picture: '',
          desc: ''
     }

const myReducer = (state = initialState, action) => {
     switch (action.type) {
          case types.ACCOUNT:
               sessionStorage.setItem('account', JSON.stringify(action.account));
               return action.account;
          case types.LOGOUT:
               sessionStorage.clear();
               return {
                    id: '',
                    userName: '',
                    name: '',
                    passWord: '',
                    email: '',
                    picture: ''
               }
          default: return state;
     }
};

export default myReducer;