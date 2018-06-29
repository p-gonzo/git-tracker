const selectedProject = (state=null, action) => {
  switch (action.type) {
    case "SET_CURRENT_PROJECT":
      return Object.assign({}, state, action.payload);
    default: 
      return state;
  } 
}

module.exports = selectedProject
