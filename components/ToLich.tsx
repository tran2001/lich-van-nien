import React from "react";

type Props = {
  dateInfo: any;
};

const ToLich = ({ dateInfo }: Props) => {
  if (!dateInfo) return <></>;
  return (
    <div className=" tw-bg-white tw-w-1/3 tw-h-[calc(100vh_-_100px)]">
      <div className="calendar-page top tw-flex tw-flex-col tw-justify-between">
        <div>
          <span className="tw-w-full tw-flex tw-justify-center tw-mt-10 tw-text-2xl tw-font-bold">
            {dateInfo?.solarInfo["Tháng năm"]}
          </span>
          <div className="tw-w-full tw-flex tw-justify-center tw-items-center tw-mt-10 tw-flex-col">
            <span className="tw-text-xl">{dateInfo?.solarInfo["Thứ"]}</span>
            <span className="tw-text-3xl tw-font-bold">
              {dateInfo?.solarInfo["Ngày"]}
            </span>
            {dateInfo?.lunarInDay["Ngày Bình thường"] && (
              <span className="tw-text-xl tw-font-bold">Ngày Bình thường</span>
            )}
            {dateInfo?.lunarInDay["Ngày Hoàng đạo"] && (
              <span className="tw-text-xl tw-font-bold">Ngày Hoàng đạo</span>
            )}
            {dateInfo?.lunarInDay["Ngày Hắc đạo"] && (
              <span className="tw-text-xl tw-font-bold">Ngày Hắc đạo</span>
            )}
            {dateInfo?.solarInfo["Ngày lễ"] && (
              <span className="tw-text-xl tw-font-bold">
                {dateInfo?.solarInfo["Ngày lễ"]}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToLich;
