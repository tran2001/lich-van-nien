import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface listDayState {
  startDate: any;
  endDate: any;
}

const initialState: listDayState = {
  startDate: null,
  endDate: null,
};

export const listDaySlice = createSlice({
  name: "listDay",
  initialState,
  reducers: {
    setStorePeriodDate: (state, action: PayloadAction<Date>) => {
      if (!state.startDate) {
        state.startDate = action.payload;
      } else if (state.startDate && !state.endDate) {
        if (String(state.startDate) === String(action.payload)) {
          return;
        }
        state.endDate = action.payload;
      } else if (state.startDate && state.endDate) {
        state.startDate = action.payload;
        state.endDate = null;
      }
    },

    resetListDay: (state) => {
      console.log(123);
      state.startDate = null;
      state.endDate = null;
    },
  },
});

export const { setStorePeriodDate, resetListDay } = listDaySlice.actions;

export default listDaySlice.reducer;
