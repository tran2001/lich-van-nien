import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MonthComponent from "./MonthComponent";
import { setFunction } from "../src/features/functionSlice";
import { EFunctions } from "../contants";
import XMark from "../assets/svg/x-mark";
import { resetListDay, setStorePeriodDate } from "../src/features/listDaySlice";
import { resetStoreFocusDate } from "../src/features/focusDaySlice";
import Return from "../assets/svg/return";
import { setStepStore } from "../src/features/stepSlice";
import Caution from "../assets/svg/caution";
import {
  resetDescription,
  setStoreDescription,
} from "../src/features/descriptionSlice";
import { format } from "date-fns";

type Props = {};

enum EDayPeriodType {
  FUTURE = "future",
  PAST = "past",
}

const Year = (props: Props) => {
  const dispatch = useDispatch();

  const { year } = useSelector((state: any) => state.year);
  const { text } = useSelector((state: any) => state.description);
  const { startDate, endDate, countDayPeriod } = useSelector(
    (state: any) => state.listDay
  );

  const [dayPeriod, setDayPeriod] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  const { noneFunction, isCountingDayPeriod } = useSelector(
    (state: any) => state.functions
  );

  useEffect(() => {
    const yearSpan = document.getElementById("year-span");
    const monthsContainer = document.getElementById("months-container");
    setTimeout(() => {
      yearSpan?.classList.remove("tw-translate-y-[420px]");
      yearSpan?.classList.remove("tw-text-[35px]");
      yearSpan?.classList.remove("text-thin");
      yearSpan?.classList.add("tw-text-[50px]");
    }, 1000);
    setTimeout(() => {
      monthsContainer?.classList.remove("tw-opacity-0");
      monthsContainer?.classList.add("tw-opacity-100");
    }, 1800);
  }, []);

  const handleStopFunction = () => {
    setDayPeriod(0);
    setIsOpenTooltip(false);
    dispatch(resetListDay());
    dispatch(resetStoreFocusDate());
    dispatch(setFunction(EFunctions.NONE));
    dispatch(resetDescription());
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePickingDayPeriod = (type: EDayPeriodType) => {
    if (!dayPeriod) return;
    const currentDay = new Date();
    if (type === EDayPeriodType.FUTURE) {
      const futureNewDate = new Date();
      futureNewDate.setDate(currentDay.getDate());
      dispatch(setStorePeriodDate(futureNewDate));
      const newDate = new Date();
      newDate.setDate(currentDay.getDate() + dayPeriod);
      console.log(newDate);
      dispatch(setStorePeriodDate(newDate));
    } else if (type === EDayPeriodType.PAST) {
      const newDate = new Date();
      newDate.setDate(currentDay.getDate() - dayPeriod);
      dispatch(setStorePeriodDate(newDate));
      dispatch(setStorePeriodDate(new Date()));
    }
  };

  const countWeekdaysAndWeekends = (startDate: Date, endDate: Date) => {
    let start = new Date(startDate);
    let end = new Date(endDate);

    let weekends = 0;
    let weekdays = 0;

    while (start <= end) {
      const day = start.getDay();
      if (day === 6 || day === 0) {
        weekends++;
      } else {
        weekdays++;
      }
      start.setDate(start.getDate() + 1);
    }

    return {
      weekends,
      weekdays,
    };
  };

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        setStoreDescription(
          `Từ ngày ${format(startDate, "dd/MM/yyyy")} đến ngày ${format(
            endDate,
            "dd/MM/yyyy"
          )} có ${
            countWeekdaysAndWeekends(startDate, endDate).weekdays
          } ngày trong tuần, ${
            countWeekdaysAndWeekends(startDate, endDate).weekends
          } ngày cuối tuần`
        )
      );
    }
  }, [startDate, endDate]);

  const handleMenuItemClick = (func: EFunctions) => {
    dispatch(setFunction(func));
    dispatch(resetStoreFocusDate());
    dispatch(resetListDay());
    setIsOpen(false);
  };

  const handleReturn = () => {
    dispatch(resetDescription());
    dispatch(setStepStore(0));
    setIsOpenTooltip(false);
  };

  return (
    <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-flex-col tw-gap-y-10 tw-relative">
      <div className="tw-relative tw-w-[80%] tw-flex tw-justify-center tw-items-center">
        <div
          className="tw-flex tw-gap-x-4 tw-items-center tw-absolute tw-top-6 tw-left-6 tw-cursor-pointer"
          onClick={handleReturn}
        >
          <a className="tw-group tw-relative tw-inline-block focus:tw-outline-none focus:tw-ring tw-cursor-pointer">
            <span className="tw-absolute tw-inset-0 tw-translate-x-1.5 tw-translate-y-1.5 button-background tw-transition-transform group-hover:tw-translate-x-0 group-hover:tw-translate-y-0"></span>

            <span className="tw-relative tw-border-2 tw-border-white tw-px-8 tw-py-3 tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-white group-active:tw-text-opacity-75 tw-flex tw-items-center">
              <div className="tw-w-5 tw-h-5 tw-mr-3">
                <Return />
              </div>
              <span className=" tw-text-white">Trở lại</span>
            </span>
          </a>
        </div>
        <div className="tw-absolute tw-z-50 tw-right-6 tw-flex tw-items-center tw-flex-row-reverse tw-gap-x-10">
          <a className="tw-group tw-relative tw-inline-block focus:tw-outline-none focus:tw-ring tw-cursor-pointer">
            <span className="tw-absolute tw-inset-0 tw-translate-x-1.5 tw-translate-y-1.5 button-background tw-transition-transform group-hover:tw-translate-x-0 group-hover:tw-translate-y-0"></span>

            <span
              className="tw-relative tw-inline-block tw-border-2 tw-border-white tw-px-8 tw-py-3 tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-white group-active:tw-text-opacity-75"
              onClick={toggleDropdown}
            >
              Chọn một chức năng
            </span>
          </a>
          {isOpen && (
            <div className="tw-absolute tw-bg-white tw-border tw-w-60 tw-mt-2 tw-shadow-lg tw-top-14 tw-rounded-lg">
              <span
                onClick={() => handleMenuItemClick(EFunctions.PICKING_DAY)}
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-gray-100 tw-rounded-t-lg"
              >
                Chọn khoảng ngày
              </span>
              <span
                onClick={() => handleMenuItemClick(EFunctions.DAY_PERIOD)}
                className={`tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-gray-100 ${
                  year === 2024 ? "" : "tw-hidden"
                }`}
              >
                Tính ngày tiến lùi
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.FIRST_DAY_OF_MONTH)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-gray-100"
              >
                Chọn ngày đầu tháng
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.LAST_DAY_OF_MONTH)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-gray-100"
              >
                Chọn ngày cuối tháng
              </span>
              <span
                onClick={() => handleMenuItemClick(EFunctions.SUNDAYS_OF_MONTH)}
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-gray-100"
              >
                Chọn chủ nhật của tháng
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.MONTH_WITH_31_DAY)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-gray-100"
              >
                Tháng 31 ngày
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.MONTH_WITH_30_DAY)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-gray-100"
              >
                Tháng 30 ngày
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.MONTH_WITH_29_DAY)
                }
                className={`tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-gray-100 ${
                  year % 4 === 0 ? "" : "tw-hidden"
                }`}
              >
                Tháng 29 ngày
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.MONTH_WITH_28_DAY)
                }
                className={`tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-gray-100 ${
                  year % 4 === 0 ? "tw-hidden" : ""
                }`}
              >
                Tháng 28 ngày
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.MONTH_WITH_MOST_SUNDAY)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-gray-100 tw-rounded-b-lg"
              >
                Tháng có nhiều chủ nhật nhất
              </span>
            </div>
          )}
          <div
            className={`tw-z-30 tw-w-12 tw-h-12 tw-duration-500 ${
              noneFunction ? "tw-opacity-0" : "tw-opacity-100 tw-cursor-pointer"
            }`}
            onClick={handleStopFunction}
          >
            <XMark />
          </div>
        </div>
        <div
          className={`tw-absolute tw-z-30 tw-right-[400px] tw-flex tw-items-center tw-gap-x-4 tw-duration-500 ${
            !isCountingDayPeriod
              ? "tw-opacity-0"
              : "tw-opacity-100 tw-cursor-pointer"
          }`}
        >
          <div className="tw-h-[30px]">
            <input
              type="number"
              className="tw-outline-none tw-px-4 tw-py-2 tw-bg-transparent tw-border-b-2 tw-border-0 tw-text-white text-thin tw-w-[300px]"
              placeholder="Nhập khoảng cách ngày"
              onChange={(e) => setDayPeriod(Number(e.target.value))}
            />
          </div>
          <a
            className="tw-inline-block tw-rounded-full tw-border tw-border-indigo-600 tw-bg-indigo-600 tw-p-3 tw-text-white hover:tw-bg-transparent hover:tw-text-indigo-600 focus:tw-outline-none focus:tw-ring active:tw-text-indigo-500"
            onClick={() => handlePickingDayPeriod(EDayPeriodType.PAST)}
          >
            <svg
              className="tw-size-5 tw-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
          <a
            className="tw-inline-block tw-rounded-full tw-border tw-border-indigo-600 tw-bg-indigo-600 tw-p-3 tw-text-white hover:tw-bg-transparent hover:tw-text-indigo-600 focus:tw-outline-none focus:tw-ring active:tw-text-indigo-500"
            onClick={() => handlePickingDayPeriod(EDayPeriodType.FUTURE)}
          >
            <svg
              className="tw-size-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
        <span
          className="text-thin tw-text-[35px] tw-text-white tw-duration-500 tw-ease-in tw-translate-y-[420px]"
          id="year-span"
        >
          {year}
        </span>
        <span
          className={`tw-absolute tw-left-[500px] tw-cursor-pointer ${
            text ? "tw-opacity-100" : "tw-opacity-0"
          }`}
        >
          <div className="tw-relative tw-flex tw-flex-col tw-items-center">
            <div
              className="tw-w-10 tw-h-10"
              onClick={() => setIsOpenTooltip(!isOpenTooltip)}
            >
              <Caution />
            </div>
            <div
              className={`tw-w-auto tw-min-w-[300px] tw-top-12 tw-absolute tw-h-auto tw-min-h-[50px] tw-duration-300 tw-bg-white tw-rounded-lg tw-text-center tw-p-3 tw-z-40 ${
                isOpenTooltip ? "tw-opacity-100" : "tw-opacity-0"
              }`}
            >
              <span className="tw-text-[20px]">{text}</span>
            </div>
          </div>
        </span>
      </div>

      <div
        className="tw-grid tw-grid-cols-4 tw-gap-10 tw-opacity-0 tw-duration-500 tw-w-[80%]"
        id="months-container"
      >
        {[...Array(12)].map((_, index) => {
          return (
            <span key={index}>
              <MonthComponent month={index + 1} />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Year;
