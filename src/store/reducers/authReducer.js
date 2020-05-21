const initialState = {
  isLoggedIn: false,
  user: {},
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default authReducer;
