import React, { useEffect, useState } from "react";

type Props = {
  dateInfo: any;
};

const ToLich = ({ dateInfo }: Props) => {
  let [previousNumber, setPreviousNumber] = useState<number>(1);

  function getRandomNumberNoRepeat() {
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * 4) + 1;
    } while (randomNum === previousNumber);

    setPreviousNumber(randomNum);
    return randomNum;
  }
  useEffect(() => {
    console.log(dateInfo);
    const calendar_page = document.getElementById("calendar-page");
    calendar_page?.classList.remove("calendar-page-4");
    calendar_page?.classList.remove("calendar-page-3");
    calendar_page?.classList.remove("calendar-page-2");
    calendar_page?.classList.remove("calendar-page-1");
    calendar_page?.classList.add(`calendar-page-${getRandomNumberNoRepeat()}`);
  }, [dateInfo]);
  if (!dateInfo)
    return <div className=" calendar-page-3 tw-w-1/3 tw-h-full tw-px-10"></div>;
  return (
    <div
      className="tw-bg-white/5 tw-w-1/3 tw-h-full tw-px-10 tw-duration-300 calendar-page-3 tw-text-[#07180B] tw-py-20"
      id="calendar-page"
    >
      <div className="top tw-flex tw-flex-col tw-justify-between tw-text-center tw-h-full">
        <div>
          <span className="tw-w-full tw-flex tw-justify-center tw-mt-10 tw-text-[30px]">
            {dateInfo?.solarInfo["Tháng năm"]}
          </span>
          <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-mt-10 tw-flex-col">
            <span className="tw-text-[80px] text-thin">
              {dateInfo?.solarInfo["Thứ"]}
            </span>
            <span className="tw-text-[200px] tw-font-bold">
              {dateInfo?.solarInfo["Ngày"]}
            </span>
            {dateInfo?.solarInfo["Ngày lễ"] && (
              <span className="tw-text-3xl tw-font-bold tw-mt-10 tw-text-[20px]">
                {dateInfo?.solarInfo["Ngày lễ"]}
              </span>
            )}
            {dateInfo?.solarInfo["Danh ngôn"] && (
              <span className="tw-text-3xl tw-font-bold tw-mt-10 tw-text-[20px]">
                {dateInfo?.solarInfo["Danh ngôn"]}
              </span>
            )}
            {dateInfo?.solarInfo["Tác giả"] && (
              <span className="tw-mt-6 tw-text-end tw-text-[20px]">
                - {dateInfo.solarInfo["Tác giả"]} -
              </span>
            )}
          </div>
        </div>
        <div className="tw-flex tw-flex-col tw-items-center">
          {dateInfo?.lunarInDay["Ngày Bình thường"] && (
            <span className="tw-text-xl tw-font-bold">Ngày Bình thường</span>
          )}
          {dateInfo?.lunarInDay["Ngày Hoàng đạo"] && (
            <span className="tw-text-xl tw-font-bold">Ngày Hoàng đạo</span>
          )}
          {dateInfo?.lunarInDay["Ngày Hắc đạo"] && (
            <span className="tw-text-xl tw-font-bold">Ngày Hắc đạo</span>
          )}
          <span className="tw-text-xl tw-font-bold">
            Giờ hoàng đạo: {dateInfo?.lunarInDay["Giờ Hoàng đạo"]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToLich;
