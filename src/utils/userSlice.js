import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log({ action });
      const { payload } = action;
      // console.log({ payloa});
      state.user = payload;
    },
    clearUser: () => {
      return initialState; // Reset state to initial state
    },
  },
});

export default userSlice.reducer;
export const { setUser, clearUser } = userSlice.actions;
