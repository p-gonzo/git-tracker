module.exports = {
  SET_CURRENT_PROJECT: payload => {
    return {
      type: "SET_CURRENT_PROJECT",
      payload: payload
    };
  },
  SET_PROJECTS: payload => {
    return {
      type: "SET_PROJECTS",
      payload: payload
    };
  },
  REMOVE_PROJECT: payload => {
    return {
      type: "REMOVE_PROJECT",
      payload: payload
    };
  },
  ADD_PROJECT: payload => {
    return {
      type: "ADD_PROJECT",
      payload: payload
    };
  },
  SET_CURRENT_COMMIT: payload => {
    return {
      type: "SET_CURRENT_COMMIT",
      payload: payload
    };
  },
  SET_CURRENT_STUDENT: payload => {
    return {
      type: "SET_CURRENT_STUDENT",
      payload: payload
    };
  },
  SET_STUDENTS: payload => {
    return {
      type: "SET_STUDENTS",
      payload: payload
    };
  },
  ADD_STUDENT: payload => {
    return {
      type: "ADD_STUDENT",
      payload: payload
    };
  },
  REMOVE_STUDENT: payload => {
    return {
      type: "REMOVE_STUDENT",
      payload: payload
    };
  },
  SET_COMMITS: payload => {
    return {
      type: "SET_COMMITS",
      payload: payload
    };
  },
  ADD_COMMIT: payload => {
    return {
      type: "ADD_COMMIT",
      payload: payload
    };
  },
  REMOVE_COMMIT: payload => {
    return {
      type: "REMOVE_COMMIT",
      payload: payload
    };
  }
};
