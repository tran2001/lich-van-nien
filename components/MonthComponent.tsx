import { useEffect, useState } from "react";
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
import { setStoreMonth } from "../src/features/yearSlice";
import { setStepStore } from "../src/features/stepSlice";
import {
  setStoreFocusDate,
  setStoreFocusMonth,
  setStoreFocusSundaysOfMonth,
} from "../src/features/focusDaySlice";
import { setStoreDescription } from "../src/features/descriptionSlice";
import { getDayOfWeek } from "../contants";

type Props = {
  month: number;
};

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const DaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
`;

const WeekdaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 10px;
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
  const {
    noneFunction,
    isPickingMonthWith31Day,
    isPickingMonthWith30Day,
    isPickingMonthWith28Day,
    isPickingMonthWith29Day,
    isPickingLastDayOfMonth,
    isPickingFirstDayOfMonth,
    isPickingSundaysOfMonth,
    isPickingMonthWithMostSunday,
  } = useSelector((state: any) => state.functions);

  const currentDate = new Date(`${year}-${month}-01`);
  const lastDayIndexOfMonth = getDate(endOfMonth(currentDate));
  const [isActiveMonth, setIsActiveMonth] = useState(false);
  const [isUsingPickingMonthFunction, setIsUsingPickingMonthFunction] =
    useState(false);

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

  const getLastDayOfMonth = (year: any, month: any) => {
    const nextMonth = new Date(year, month, 1);
    nextMonth.setDate(0);
    return nextMonth.getDate();
  };

  const countSundaysInMonth = (year: any, month: any) => {
    let sundaysCount = 0;

    let date = new Date(year, month - 1, 1);

    while (date.getMonth() === month - 1) {
      if (date.getDay() === 0) {
        sundaysCount++;
      }
      date.setDate(date.getDate() + 1);
    }

    return sundaysCount;
  };

  const handleChooseMonth = () => {
    if (noneFunction) {
      dispatch(setStoreMonth(month));
      dispatch(setStepStore(2));
    } else if (!noneFunction && isPickingLastDayOfMonth) {
      dispatch(setStoreFocusMonth(month));
      dispatch(setStoreFocusDate(getDate(endOfMonth(currentDate))));
      const lastDay = getLastDayOfMonth(year, month);
      const lastDayDate = new Date(year, month - 1, lastDay);
      const dayOfWeek = getDayOfWeek(lastDayDate);

      dispatch(
        setStoreDescription(
          `Ngày cuối cùng của tháng ${month} năm ${year} là ngày ${lastDay}/${month}/${year} (${dayOfWeek})`
        )
      );
    } else if (!noneFunction && isPickingFirstDayOfMonth) {
      dispatch(setStoreFocusMonth(month));
      dispatch(setStoreFocusDate(1));
      const firstDay = 1;
      const dayOfWeek = getDayOfWeek(new Date(year, month - 1, firstDay));
      dispatch(
        setStoreDescription(
          `Ngày đầu tiên của tháng ${month} năm ${year} là ngày ${firstDay}/${month}/${year} (${dayOfWeek})`
        )
      );
    } else if (!noneFunction && isPickingSundaysOfMonth) {
      dispatch(setStoreFocusMonth(month));
      const dateArr: any[] = [];
      getSundaysInMonth(year, month - 1).forEach((date) => {
        dateArr.push(getDate(date));
      });
      dispatch(setStoreFocusSundaysOfMonth(dateArr));
    }
  };

  useEffect(() => {
    if (isPickingMonthWith28Day) {
      lastDayIndexOfMonth === 28
        ? setIsActiveMonth(true)
        : setIsActiveMonth(false);
      setIsUsingPickingMonthFunction(true);
    } else if (isPickingMonthWith29Day) {
      lastDayIndexOfMonth === 29
        ? setIsActiveMonth(true)
        : setIsActiveMonth(false);
      setIsUsingPickingMonthFunction(true);
    } else if (isPickingMonthWith30Day) {
      lastDayIndexOfMonth === 30
        ? setIsActiveMonth(true)
        : setIsActiveMonth(false);
      setIsUsingPickingMonthFunction(true);
    } else if (isPickingMonthWith31Day) {
      lastDayIndexOfMonth === 31
        ? setIsActiveMonth(true)
        : setIsActiveMonth(false);
      setIsUsingPickingMonthFunction(true);
    } else if (isPickingMonthWithMostSunday) {
      countSundaysInMonth(year, month) === 5
        ? setIsActiveMonth(true)
        : setIsActiveMonth(false);
      setIsUsingPickingMonthFunction(true);
    } else {
      setIsUsingPickingMonthFunction(false);
    }
  }, [
    isPickingMonthWith31Day,
    isPickingMonthWith30Day,
    isPickingMonthWith28Day,
    isPickingMonthWith29Day,
    isPickingMonthWithMostSunday,
  ]);

  useEffect(() => {
    if (!isUsingPickingMonthFunction) {
      setIsActiveMonth(false);
    }
  }, [isUsingPickingMonthFunction]);

  return (
    <div
      className={`tw-bg-white/5 tw-rounded-lg tw-border tw-border-white/64 tw-min-h-[330px] tw-duration-300 tw-relative ${
        isActiveMonth ? "tw-shadow-custom" : ""
      } ${noneFunction ? " hover:tw-shadow-custom tw-cursor-pointer" : ""}`}
      onClick={handleChooseMonth}
    >
      {!isActiveMonth && isUsingPickingMonthFunction && (
        <div className="tw-absolute tw-w-full tw-h-full tw-bg-[#c3c3c3]/0 tw-backdrop-blur-[5px]"></div>
      )}
      {/* <h1 className="tw-text-white tw-text-end tw-mr-3">Tháng {month}</h1> */}
      <CalendarWrapper className="">
        <span className="tw-text-white tw-text-[20px] tw-text-center tw-mb-5 tw-mt-2">
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
        <DaysWrapper className="tw-text-white">
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
