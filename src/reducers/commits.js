const commits = (state = [], action) => {
  switch (action.type) {
    case "SET_COMMITS":
      return action.payload;
    case "ADD_COMMIT":
      return [...state, action.payload];
    case "REMOVE_COMMIT":
      let newState = state.slice();
      newState.splice(action.payload, 1);
      return newState;
    default:
      return state;
  }
};

module.exports = commits;
