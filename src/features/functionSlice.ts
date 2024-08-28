import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EFunctions } from "../../contants";

export interface YearState {
  noneFunction: boolean;
  isPickingDayPeriod: boolean;
  isCountingDayPeriod: boolean;
  isPickingFirstDayOfMonth: boolean;
  isPickingLastDayOfMonth: boolean;
  isPickingSundaysOfMonth: boolean;
  isPickingMonthWith31Day: boolean;
  isPickingMonthWith30Day: boolean;
  isPickingMonthWith29Day: boolean;
  isPickingMonthWith28Day: boolean;
  isPickingMonthWithMostSunday: boolean;
}

const initialState: YearState = {
  noneFunction: true,
  isPickingDayPeriod: false,
  isCountingDayPeriod: false,
  isPickingFirstDayOfMonth: false,
  isPickingLastDayOfMonth: false,
  isPickingSundaysOfMonth: false,
  isPickingMonthWith31Day: false,
  isPickingMonthWith30Day: false,
  isPickingMonthWith29Day: false,
  isPickingMonthWith28Day: false,
  isPickingMonthWithMostSunday: false,
};

export const functionSlice = createSlice({
  name: "function",
  initialState,
  reducers: {
    setFunction: (state, action: PayloadAction<EFunctions>) => {
      switch (action.payload) {
        case EFunctions.PICKING_DAY:
          return {
            ...initialState,
            isPickingDayPeriod: true,
            noneFunction: false,
          };
        case EFunctions.DAY_PERIOD:
          return {
            ...initialState,
            isCountingDayPeriod: true,
            noneFunction: false,
          };
        case EFunctions.FIRST_DAY_OF_MONTH:
          return {
            ...initialState,
            isPickingFirstDayOfMonth: true,
            noneFunction: false,
          };
        case EFunctions.LAST_DAY_OF_MONTH:
          return {
            ...initialState,
            isPickingLastDayOfMonth: true,
            noneFunction: false,
          };
        case EFunctions.SUNDAYS_OF_MONTH:
          return {
            ...initialState,
            isPickingSundaysOfMonth: true,
            noneFunction: false,
          };
        case EFunctions.MONTH_WITH_31_DAY:
          return {
            ...initialState,
            isPickingMonthWith31Day: true,
            noneFunction: false,
          };
        case EFunctions.MONTH_WITH_30_DAY:
          return {
            ...initialState,
            isPickingMonthWith30Day: true,
            noneFunction: false,
          };
        case EFunctions.MONTH_WITH_29_DAY:
          return {
            ...initialState,
            isPickingMonthWith29Day: true,

            noneFunction: false,
          };
        case EFunctions.MONTH_WITH_28_DAY:
          return {
            ...initialState,
            isPickingMonthWith28Day: true,
            noneFunction: false,
          };
        case EFunctions.MONTH_WITH_MOST_SUNDAY:
          return {
            ...initialState,
            isPickingMonthWithMostSunday: true,
            noneFunction: false,
          };
        default:
          return initialState;
      }
    },
  },
});

export const { setFunction } = functionSlice.actions;

export default functionSlice.reducer;
