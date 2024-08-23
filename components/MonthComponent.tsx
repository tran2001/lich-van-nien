import React from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  getDate,
  getDay,
  startOfMonth,
} from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Day from "./Day";
import { setStoreDay, setStoreMonth } from "../src/features/yearSlice";
import { setStepStore } from "../src/features/stepSlice";
import {
  setStoreFocusDate,
  setStoreFocusMonth,
  setStoreFocusSundaysOfMonth,
} from "../src/features/focusDaySlice";

type Props = {
  month: number;
};

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
`;

const WeekdaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const WeekdayCell = styled.div`
  color: white;
  text-align: center;
  padding: 10px;
`;

const MonthComponent = ({ month }: Props) => {
  const dispatch = useDispatch();
  const { year } = useSelector((state: any) => state.year);
  const { focusDate } = useSelector((state: any) => state.focusDay);
  const {
    noneFunction,
    isPickingMonthWith31Day,
    isPickingMonthWith30Day,
    isPickingMonthWith28Day,
    isPickingMonthWith29Day,
    isPickingLastDayOfMonth,
    isPickingFirstDayOfMonth,
    isPickingSundaysOfMonth,
  } = useSelector((state: any) => state.functions);
  const currentDate = new Date(`${year}-${month}-01`);
  const lastDayIndexOfMonth = getDate(endOfMonth(currentDate));

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const startDayOfWeek = (date: Date) => {
    const day = getDay(date);
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = Array.from({ length: startDayOfWeek(start) })
    .fill(null)
    .concat(days);

  function getSundaysInMonth(y: any, m: any) {
    const sundays = [];
    const date = new Date(y, m, 1);

    while (date.getMonth() === m) {
      if (date.getDay() === 0) {
        sundays.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
    }

    return sundays;
  }

  const handleChooseMonth = () => {
    if (noneFunction) {
      dispatch(setStoreMonth(month));
      dispatch(setStepStore(2));
    } else if (!noneFunction && isPickingLastDayOfMonth) {
      dispatch(setStoreFocusMonth(month));
      dispatch(setStoreFocusDate(getDate(endOfMonth(currentDate))));
    } else if (!noneFunction && isPickingFirstDayOfMonth) {
      dispatch(setStoreFocusMonth(month));
      dispatch(setStoreFocusDate(1));
    } else if (!noneFunction && isPickingSundaysOfMonth) {
      dispatch(setStoreFocusMonth(month));
      const dateArr: any[] = [];
      getSundaysInMonth(year, month - 1).forEach((date: any) => {
        dateArr.push(getDate(date));
      });
      dispatch(setStoreFocusSundaysOfMonth(dateArr));
    }
  };
  return (
    <div
      className={`tw-bg-white/5 tw-rounded-lg tw-shadow-md tw-shadow-black/10 tw-backdrop-blur-sm tw-border tw-border-white/64 tw-min-h-[330px] tw-p-3 tw-cursor-pointer ${
        isPickingMonthWith31Day && lastDayIndexOfMonth === 31
          ? "tw-animate-[flash_1s_ease-in-out_infinite]"
          : isPickingMonthWith30Day && lastDayIndexOfMonth === 30
          ? "tw-animate-[flash_1s_ease-in-out_infinite]"
          : isPickingMonthWith28Day && lastDayIndexOfMonth === 28
          ? "tw-animate-[flash_1s_ease-in-out_infinite]"
          : isPickingMonthWith29Day && lastDayIndexOfMonth === 29
          ? "tw-animate-[flash_1s_ease-in-out_infinite]"
          : ""
      }`}
      onClick={handleChooseMonth}
    >
      {/* <h1 className="tw-text-white tw-text-end tw-mr-3">Tháng {month}</h1> */}
      <CalendarWrapper className="">
        <span className="tw-text-white tw-text-[20px] tw-text-center">
          Tháng {month}
        </span>
        <WeekdaysWrapper>
          <WeekdayCell>T2</WeekdayCell>
          <WeekdayCell>T3</WeekdayCell>
          <WeekdayCell>T4</WeekdayCell>
          <WeekdayCell>T5</WeekdayCell>
          <WeekdayCell>T6</WeekdayCell>
          <WeekdayCell>T7</WeekdayCell>
          <WeekdayCell className="!tw-text-red-500">CN</WeekdayCell>
        </WeekdaysWrapper>
        <DaysWrapper>
          {daysInMonth.map((day, index) =>
            day ? (
              <div key={index}>
                <Day
                  key={index}
                  //@ts-ignore
                  day={day}
                />
              </div>
            ) : (
              <div key={index} />
            )
          )}
        </DaysWrapper>
      </CalendarWrapper>
    </div>
  );
};

export default MonthComponent;
