import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStorePeriodDate } from "../src/features/listDaySlice";
import { getDate, getMonth } from "date-fns";

type Props = {
  day: any;
  color?: string;
  //   focusDate?: any;
};

const Day = ({ day, color = "#ffffff" }: Props) => {
  const dispatch = useDispatch();
  const [isInPeriod, setIsInPeriod] = useState(false);
  const { isPickingDayPeriod } = useSelector((state: any) => state.functions);
  const { startDate, endDate } = useSelector((state: any) => state.listDay);
  const { focusDate, focusMonth } = useSelector((state: any) => state.focusDay);

  const handleChooseDay = () => {
    if (isPickingDayPeriod) {
      dispatch(setStorePeriodDate(day));
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      if (
        day.valueOf() >= startDate.valueOf() &&
        day.valueOf() <= endDate.valueOf()
      ) {
        setIsInPeriod(
          day.valueOf() >= startDate.valueOf() &&
            day.valueOf() <= endDate.valueOf()
        );
      } else {
        setIsInPeriod(false);
      }
    } else {
      setIsInPeriod(false);
    }
  }, [startDate, endDate]);

  return (
    <div
      className={`tw-text-center tw-rounded-full text-thin tw-text-[${color}] ${
        isInPeriod ? "tw-bg-red-500 tw-text-white" : ""
      } ${isPickingDayPeriod ? "hover:tw-bg-[#96836e] tw-cursor-pointer" : ""}
       ${
         focusDate.includes(getDate(day)) && getMonth(day) + 1 === focusMonth
           ? "tw-bg-[#96836e]"
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
