import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface YearState {
  year: number;
  month: Number;
  day: Number;
}

const initialState: YearState = {
  year: 2024,
  month: 1,
  day: 1,
};

export const yearSlice = createSlice({
  name: "year",
  initialState,
  reducers: {
    setStoreYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },

    setStoreMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
    },

    setStoreDay: (state, action: PayloadAction<number>) => {
      state.day = action.payload;
    },
  },
});

export const { setStoreYear, setStoreMonth, setStoreDay } = yearSlice.actions;

export default yearSlice.reducer;
