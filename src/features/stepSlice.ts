import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface StepState {
  step: number;
}

const initialState: StepState = {
  step: 0,
};

export const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStepStore: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
  },
});

export const { setStepStore } = stepSlice.actions;

export default stepSlice.reducer;
