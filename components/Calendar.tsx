import React, { useState } from "react";
import YearPicker from "./YearPicker";
import Year from "./Year";
import Month from "./Month";
import { useSelector } from "react-redux";

type Props = {};

const Calendar = (props: Props) => {
  const { step } = useSelector((state: any) => state.step);

  return (
    <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-select-none">
      {step === 0 ? (
        <YearPicker />
      ) : step === 1 ? (
        <Year />
      ) : step === 2 ? (
        <Month />
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default Calendar;
