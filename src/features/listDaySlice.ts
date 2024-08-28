import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface listDayState {
  startDate: any;
  endDate: any;
  countDayPeriod: number;
}

const initialState: listDayState = {
  startDate: null,
  endDate: null,
  countDayPeriod: 0,
};

export const listDaySlice = createSlice({
  name: "listDay",
  initialState,
  reducers: {
    setStorePeriodDate: (state, action: PayloadAction<Date>) => {
      if (!state.startDate) {
        state.startDate = action.payload;
        state.countDayPeriod = 0;
      } else if (state.startDate && !state.endDate) {
        if (String(state.startDate) === String(action.payload)) {
          return;
        }
        state.endDate = action.payload;
        state.countDayPeriod =
          (state.endDate.valueOf() - state.startDate.valueOf()) / 86400000 + 1;
      } else if (state.startDate && state.endDate) {
        state.startDate = action.payload;
        state.endDate = null;
        state.countDayPeriod = 0;
      }
    },

    resetListDay: (state) => {
      state.startDate = null;
      state.endDate = null;
    },
  },
});

export const { setStorePeriodDate, resetListDay } = listDaySlice.actions;

export default listDaySlice.reducer;
