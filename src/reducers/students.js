const students = (state=[], action) => {
  switch(action.type) {
    case "SET_STUDENTS":
      return action.payload;
    case "ADD_STUDENT":
      return [...state, action.payload];
    case "REMOVE_STUDENT":
      let newState = state.slice();
      newState.splice(action.payload, 1);
      return newState;
    default: 
      return state;
  } 
}

module.exports = students;