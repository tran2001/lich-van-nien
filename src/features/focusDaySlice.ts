import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface listDayState {
  focusMonth: any;
  focusDate: number[];
}

const initialState: listDayState = {
  focusMonth: null,
  focusDate: [],
};

export const focusDaySlice = createSlice({
  name: "focusDay",
  initialState,
  reducers: {
    setStoreFocusMonth: (state, action: PayloadAction<any>) => {
      state.focusMonth = action.payload;
    },
    setStoreFocusDate: (state, action: PayloadAction<any>) => {
      state.focusDate = [action.payload];
    },
    setStoreFocusSundaysOfMonth: (state, action: PayloadAction<any>) => {
      state.focusDate = action.payload;
    },
    resetStoreFocusDate: (state) => {
      state.focusMonth = null;
      state.focusDate = [];
    },
  },
});

export const {
  setStoreFocusMonth,
  setStoreFocusDate,
  setStoreFocusSundaysOfMonth,
  resetStoreFocusDate,
} = focusDaySlice.actions;

export default focusDaySlice.reducer;
