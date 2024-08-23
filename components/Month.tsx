import { useDispatch, useSelector } from "react-redux";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";
import styled from "styled-components";
import Day from "./Day";
import { useLazyGetDayInfoQuery } from "../src/services/day";
import ToLich from "./ToLich";
import { useEffect, useState } from "react";
import { setStepStore } from "../src/features/stepSlice";
import Return from "../assets/svg/return";

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DaysWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 20px;
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
`;

type Props = {};

const Month = (props: Props) => {
  const dispatch = useDispatch();

  const { day, month, year } = useSelector((state: any) => state.year);
  const { step } = useSelector((state: any) => state.step);

  const [triggerGetOneDay] = useLazyGetDayInfoQuery();

  const currentDate = new Date(`${year}-${month}-${day}`);

  const [dateInfo, setDateInfo] = useState<any>(null);

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

  const handleGetDayInfo = async (day: Date) => {
    try {
      const res = await triggerGetOneDay(format(day, "yyyyMMdd"));
      if (res.data) {
        setDateInfo(res.data?.pageProps.resp.data.content.entries[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseDay = (day: any) => {
    if (step === 2) {
      handleGetDayInfo(day);
    }
  };

  useEffect(() => {
    handleGetDayInfo(currentDate);
  }, []);

  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-gap-x-[100px] tw-h-full tw-relative">
      <div
        className="tw-flex tw-gap-x-4 tw-items-center tw-absolute tw-top-6 tw-left-6 tw-cursor-pointer"
        onClick={() => dispatch(setStepStore(1))}
      >
        <div className="tw-w-[40px] tw-h-[40px]">
          <Return />
        </div>
        <span className="tw-text-[25px] tw-text-white">Trở lại</span>
      </div>
      <div className="tw-w-1/3 tw-h-1/3 tw-text-2xl">
        <CalendarWrapper className="">
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
                <div key={index} onClick={() => handleChooseDay(day)}>
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
      {dateInfo ? <ToLich dateInfo={dateInfo} /> : <></>}
    </div>
  );
};

export default Month;
