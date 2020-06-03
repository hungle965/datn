const initialState = [
     {
          id: "1",
          name: "Electronic"
     },
     {
          id: "2",
          name: "Pets"
     },
     {
          id: "3",
          name: "Home"
     },
     {
          id: "4",
          name: "Fashion"
     },
     {
          id: "5",
          name: "Car"
     },
     {
          id: "6",
          name: "Other..."
     }
];

const myReducer = (state = initialState, action) => {
     switch (action.type) {
          default: return state;
     }
};

export default myReducer;