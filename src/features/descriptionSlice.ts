import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface descriptionState {
  text: string | null;
}

const initialState: descriptionState = {
  text: null,
};

export const descriptionSlice = createSlice({
  name: "description",
  initialState,
  reducers: {
    setStoreDescription: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.text = action.payload;
    },
    resetDescription: (state) => {
      state.text = null;
    },
  },
});

export const { setStoreDescription, resetDescription } =
  descriptionSlice.actions;

export default descriptionSlice.reducer;
