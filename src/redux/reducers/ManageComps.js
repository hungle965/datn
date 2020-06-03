const initialState = [
  {
       id: "1",
       name: "products"
  },
  {
       id: "2",
       name: "users"
  },
  {
       id: "3",
       name: "orders"
  },
  {
       id: "4",
       name: "types"
  },
  {
       id: "5",
       name: "chart"
  }
];

const myReducer = (state = initialState, action) => {
  switch (action.type) {
       default: return state;
  }
};

export default myReducer;