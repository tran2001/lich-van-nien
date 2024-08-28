import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStorePeriodDate } from "../src/features/listDaySlice";
import { getDate, getMonth } from "date-fns";

type Props = {
  day: any;
  //   focusDate?: any;
};

const Day = ({ day }: Props) => {
  const dispatch = useDispatch();
  const [isInPeriod, setIsInPeriod] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const { isPickingDayPeriod } = useSelector((state: any) => state.functions);
  const { startDate, endDate } = useSelector((state: any) => state.listDay);
  const { focusDate, focusMonth } = useSelector((state: any) => state.focusDay);
  const { step } = useSelector((state: any) => state.step);

  const handleChooseDay = () => {
    if (isPickingDayPeriod) {
      dispatch(setStorePeriodDate(day));
    }
  };

  useEffect(() => {
    const normalizeDate = (date: any) => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    const normalizedDay = normalizeDate(day);
    const normalizedStartDate = startDate ? normalizeDate(startDate) : null;
    const normalizedEndDate = endDate ? normalizeDate(endDate) : null;

    if (normalizedStartDate) {
      if (normalizedDay.valueOf() === normalizedStartDate.valueOf()) {
        setIsFocus(true);
      }
    }

    if (normalizedEndDate && isFocus) {
      setIsFocus(false);
    }

    if (!normalizedStartDate && !normalizedEndDate) {
      setIsFocus(false);
    }

    if (normalizedStartDate && normalizedEndDate) {
      if (
        (normalizedDay.valueOf() >= normalizedStartDate.valueOf() &&
          normalizedDay.valueOf() <= normalizedEndDate.valueOf()) ||
        (normalizedDay.valueOf() <= normalizedStartDate.valueOf() &&
          normalizedDay.valueOf() >= normalizedEndDate.valueOf())
      ) {
        setIsInPeriod(true);
      } else {
        setIsInPeriod(false);
      }
    } else {
      setIsInPeriod(false);
    }
  }, [day, startDate, endDate]);

  return (
    <div
      className={`tw-text-center tw-rounded-full tw-text-white ${
        isInPeriod || isFocus ? "tw-bg-red-500 tw-text-white" : ""
      } ${
        isPickingDayPeriod || step === 2
          ? "hover:tw-bg-[#c3c3c3] tw-cursor-pointer"
          : ""
      }
       ${
         focusDate.includes(getDate(day)) && getMonth(day) + 1 === focusMonth
           ? "tw-bg-red-500 tw-text-white"
           : ""
       }
      `}
      onClick={handleChooseDay}
    >
      {day.getDate()}
    </div>
  );
};

export default Day;
