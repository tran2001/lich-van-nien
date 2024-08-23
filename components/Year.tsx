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

type Props = {};

enum EDayPeriodType {
  FUTURE = "future",
  PAST = "past",
}

const Year = (props: Props) => {
  const dispatch = useDispatch();

  const { year } = useSelector((state: any) => state.year);

  const [dayPeriod, setDayPeriod] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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
    dispatch(resetListDay());
    dispatch(resetStoreFocusDate());
    dispatch(setFunction(EFunctions.NONE));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlePickingDayPeriod = (type: EDayPeriodType) => {
    if (!dayPeriod) return;
    const currentDay = new Date();
    if (type === EDayPeriodType.FUTURE) {
      const futureNewDate = new Date();
      futureNewDate.setDate(currentDay.getDate() - 1);
      dispatch(setStorePeriodDate(futureNewDate));
      const newDate = new Date();
      newDate.setDate(currentDay.getDate() + dayPeriod);
      dispatch(setStorePeriodDate(newDate));
    } else if (type === EDayPeriodType.PAST) {
      const newDate = new Date();
      newDate.setDate(currentDay.getDate() - dayPeriod - 1);
      dispatch(setStorePeriodDate(newDate));
      dispatch(setStorePeriodDate(new Date()));
    }
  };

  const handleMenuItemClick = (func: EFunctions) => {
    dispatch(setFunction(func));
    dispatch(resetStoreFocusDate());
    dispatch(resetListDay());
    setIsOpen(false);
  };

  return (
    <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-flex-col tw-gap-y-10 tw-relative">
      <div
        className="tw-flex tw-gap-x-4 tw-items-center tw-absolute tw-top-6 tw-left-6 tw-cursor-pointer"
        onClick={() => dispatch(setStepStore(0))}
      >
        <div className="tw-w-[40px] tw-h-[40px]">
          <Return />
        </div>
        <span className="tw-text-[25px] tw-text-white">Trở lại</span>
      </div>
      <div className="tw-relative tw-w-[80%] tw-flex tw-justify-center tw-items-center">
        <div className="tw-absolute tw-z-50 tw-right-6">
          <button
            onClick={toggleDropdown}
            className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded tw-cursor-pointer"
          >
            Chọn một chức năng
          </button>
          {isOpen && (
            <div className="tw-absolute tw-bg-white tw-border tw-rounded tw-w-48 tw-mt-2 tw-shadow-lg">
              <span
                onClick={() => handleMenuItemClick(EFunctions.PICKING_DAY)}
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-blue-100"
              >
                Chọn khoảng ngày
              </span>
              <span
                onClick={() => handleMenuItemClick(EFunctions.DAY_PERIOD)}
                className={`tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-blue-100 ${
                  year === 2024 ? "" : "tw-hidden"
                }`}
              >
                Tính ngày tiến lùi
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.FIRST_DAY_OF_MONTH)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-blue-100"
              >
                Chọn ngày đầu tháng
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.LAST_DAY_OF_MONTH)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-blue-100"
              >
                Chọn ngày cuối tháng
              </span>
              <span
                onClick={() => handleMenuItemClick(EFunctions.SUNDAYS_OF_MONTH)}
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-blue-100"
              >
                Chọn chủ nhật của tháng
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.MONTH_WITH_31_DAY)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-blue-100"
              >
                Tháng 31 ngày
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.MONTH_WITH_30_DAY)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-blue-100"
              >
                Tháng 30 ngày
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.MONTH_WITH_29_DAY)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-blue-100"
              >
                Tháng 29 ngày
              </span>
              <span
                onClick={() =>
                  handleMenuItemClick(EFunctions.MONTH_WITH_28_DAY)
                }
                className="tw-block tw-px-4 tw-py-2 tw-cursor-pointer hover:tw-bg-blue-100"
              >
                Tháng 28 ngày
              </span>
            </div>
          )}
        </div>
        <div
          className={`tw-absolute tw-top-5 tw-right-5 tw-z-30 tw-w-12 tw-h-12 tw-duration-500 tw-left-10 ${
            noneFunction ? "tw-opacity-0" : "tw-opacity-100 tw-cursor-pointer"
          }`}
          onClick={handleStopFunction}
        >
          <XMark />
        </div>
        <div
          className={`tw-absolute tw-top-5 tw-right-5 tw-z-30 tw-left-32 tw-flex tw-items-center tw-gap-x-4 tw-duration-500 ${
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
              className="tw-size-5  tw-rotate-180"
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
