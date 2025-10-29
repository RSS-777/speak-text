import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TypeInitialState = {
  value: string;
};

const initialState: TypeInitialState = {
  value: "ua",
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeLang } = langSlice.actions;
export default langSlice.reducer;
