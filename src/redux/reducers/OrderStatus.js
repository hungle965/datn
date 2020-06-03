const initialState = [
     {
          id: 0,
          name: "Canceled"
     },
     {
          id: 1,
          name: "Sent"
     },
     {
          id: 2,
          name: "Received"
     },
     {
          id: 3,
          name: "Shipping"
     },
     {
          id: 4,
          name: "Successful"
     }
];

const myReducer = (state = initialState, action) => {
     switch (action.type) {
          default: return state;
     }
};

export default myReducer;