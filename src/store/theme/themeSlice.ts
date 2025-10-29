import { createSlice } from "@reduxjs/toolkit";

type TypeInitialState = {
  value: "light" | "dark";
};

const initialState: TypeInitialState = {
  value: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
