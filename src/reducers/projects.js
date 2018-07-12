const projects = (state = [], action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return action.payload;
    case "ADD_PROJECT":
      return [...state, action.payload];
    case "REMOVE_PROJECT":
      let newState = state.slice();
      newState.splice(action.payload, 1);
      return newState;
    default:
      return state;
  }
};

module.exports = projects;
