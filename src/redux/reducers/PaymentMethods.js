// import * as types from '../constant/constant';
const initialState = [
     {
          id: "1",
          name: "Payment on delivery"
     },
     {
          id: "2",
          name: "Internet banking"
     },
     {
          id: "3",
          name: "Direct payment"
     }
];

const myReducer = (state = initialState, action) => {
     switch (action.type) {
          default: return state;
     }
};

export default myReducer;