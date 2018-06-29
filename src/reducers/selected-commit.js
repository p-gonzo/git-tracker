const selectedCommit = (state=null, action) => {
  switch (action.type) {
    case "SET_CURRENT_COMMIT":
      return Object.assign({}, state, action.payload);
    default: 
      return state;
  } 
}

module.exports = selectedCommit;
