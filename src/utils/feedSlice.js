import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  feed: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
    clearFeed: () => {
      return initialState; // Reset state to initial state
    },
  },
});

export default feedSlice.reducer;
export const { setFeed, clearFeed } = feedSlice.actions;
