import { createSlice } from "@reduxjs/toolkit";

const themes = ["light-1", "light-2", "light-3", "dark-1", "dark-2", "dark-3"];
const initialState = {
  mode: themes[0],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      const currentIndex = themes.indexOf(state.mode);
      const nextIndex = (currentIndex + 1) % themes.length;
      state.mode = themes[nextIndex];
    },
  },
});

export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;
