const selectedStudent = (state = null, action) => {
  switch (action.type) {
    case "SET_CURRENT_STUDENT":
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

module.exports = selectedStudent;
