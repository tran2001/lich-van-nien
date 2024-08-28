import React, { useEffect, useState } from "react";
import "../css/YearPicker.css";
import { useDispatch } from "react-redux";
import { setStoreYear } from "../src/features/yearSlice";
import { setStepStore } from "../src/features/stepSlice";

type Props = {};

const YearPicker = (props: Props) => {
  const dispatch = useDispatch();

  const [year, setYear] = useState(2024);
  const [yearInputValue, setYearInputValue] = useState(0);

  useEffect(() => {
    const container = document.querySelector(".container");
    const select_years = document.querySelectorAll(".select-years");
    const stickyDiv = document.querySelector(".tw-sticky") as HTMLElement;

    (container?.childNodes[0].childNodes[2] as HTMLElement).classList.add(
      "tw-opacity-100"
    );
    (container?.childNodes[0].childNodes[2] as HTMLElement).classList.remove(
      "tw-opacity-50"
    );

    container?.scrollBy(0, (2100 - 2024) * 72.5);

    const handleScroll = () => {
      let closestYear: any = null;
      let minDistance = Infinity;

      select_years.forEach((year) => {
        const rect = year.getBoundingClientRect();
        const distance = Math.abs(
          rect.top + rect.height / 2 - stickyDiv.getBoundingClientRect().top
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestYear = year as HTMLElement;
        }
      });

      if (closestYear) {
        setYear(Number(closestYear.textContent));
      }
      var closestYearDiv = container?.childNodes[0].childNodes.item(
        2102 - Number(closestYear.textContent)
      ) as HTMLElement;
      var closestYearDivIndex = Array.prototype.indexOf.call(
        container?.childNodes[0].childNodes,
        closestYearDiv
      );

      container?.childNodes[0].childNodes.forEach((element, index) => {
        if (index === closestYearDivIndex) {
          (element as HTMLElement).classList.add("tw-opacity-100");
          (element as HTMLElement).classList.remove("tw-opacity-50");
        } else {
          (element as HTMLElement).classList.add("tw-opacity-50");
          (element as HTMLElement).classList.remove("tw-opacity-100");
        }
      });
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleConfirmYear = () => {
    dispatch(setStoreYear(year));
    dispatch(setStepStore(1));
  };

  const handleSearchYear = () => {
    dispatch(setStoreYear(yearInputValue));
    dispatch(setStepStore(1));
  };

  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-y-20">
      <div className="tw-flex tw-items-center tw-gap-x-10">
        <input
          type="number"
          className="tw-outline-none tw-bg-transparent tw-border-b tw-border-b-white tw-text-white tw-text-[35px] text-thin tw-w-[200px] tw-text-center tw-px-10"
          onChange={(e) => setYearInputValue(Number(e.target.value))}
        />
        <a
          className="tw-group tw-relative tw-inline-block focus:tw-outline-none focus:tw-ring tw-cursor-pointer"
          onClick={handleSearchYear}
        >
          <span className="tw-absolute tw-inset-0 tw-translate-x-1.5 tw-translate-y-1.5 button-background tw-transition-transform group-hover:tw-translate-x-0 group-hover:tw-translate-y-0"></span>

          <span className="tw-relative tw-inline-block tw-border-2 tw-border-white tw-px-8 tw-py-3 tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-white group-active:tw-text-opacity-75">
            Xác nhận
          </span>
        </a>
      </div>

      <div className="tw-w-[300px] tw-h-[340px] tw-text-white tw-overflow-scroll tw-text-center tw-relative container tw-py-[60px] tw-select-none">
        <ul className="scroller">
          {[...Array(203)].map((_, index) => {
            return (
              <li
                key={index}
                className={`tw-my-5 text-thin tw-text-[35px] select-years tw-opacity-50 ${
                  index === 0 || index === 1 ? "!tw-opacity-0" : ""
                }`}
              >
                {2102 - index}
              </li>
            );
          })}
          <div className="tw-w-[300px] tw-h-[60px] tw-sticky tw-z-10 tw-bottom-1/2 tw-translate-y-1/2 tw-left-0 tw-right-0"></div>
        </ul>
      </div>
      <a className="tw-group tw-relative tw-inline-block focus:tw-outline-none focus:tw-ring tw-cursor-pointer">
        <span className="tw-absolute tw-inset-0 tw-translate-x-1.5 tw-translate-y-1.5 button-background tw-transition-transform group-hover:tw-translate-x-0 group-hover:tw-translate-y-0"></span>

        <span
          className="tw-relative tw-inline-block tw-border-2 tw-border-white tw-px-8 tw-py-3 tw-text-sm tw-font-bold tw-uppercase tw-tracking-widest tw-text-white group-active:tw-text-opacity-75"
          onClick={handleConfirmYear}
        >
          Xác nhận
        </span>
      </a>
    </div>
  );
};

export default YearPicker;
