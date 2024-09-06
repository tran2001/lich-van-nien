export const CHINESE_ZODIACS = {
  Tí: {
    icon: "/assets/svg/ti.svg",
  },
  Sửu: {
    icon: "/assets/svg/suu.svg",
  },
  Dần: {
    icon: "/assets/svg/dan.svg",
  },
  Mão: {
    icon: "/assets/svg/mao.svg",
  },
  Thìn: {
    icon: "/assets/svg/thin.svg",
  },
  Tỵ: {
    icon: "/assets/svg/ty.svg",
  },
  Ngọ: {
    icon: "/assets/svg/ngo.svg",
  },
  Mùi: {
    icon: "/assets/svg/mui.svg",
  },
  Thân: {
    icon: "/assets/svg/than.svg",
  },
  Dậu: {
    icon: "/assets/svg/dau.svg",
  },
  Tuất: {
    icon: "/assets/svg/tuat.svg",
  },
  Hợi: {
    icon: "/assets/svg/hoi.svg",
  },
};

export enum EFunctions {
  ABC = "ABC",
  NONE = "NONE",
  PICKING_DAY = "PICKING_DAY",
  DAY_PERIOD = "DAY_PERIOD",
  FIRST_DAY_OF_MONTH = "FIRST_DAY_OF_MONTH",
  LAST_DAY_OF_MONTH = "LAST_DAY_OF_MONTH",
  SUNDAYS_OF_MONTH = "SUNDAYS_OF_MONTH",
  MONTH_WITH_31_DAY = "MONTH_WITH_31_DAY",
  MONTH_WITH_30_DAY = "MONTH_WITH_30_DAY",
  MONTH_WITH_29_DAY = "MONTH_WITH_29_DAY",
  MONTH_WITH_28_DAY = "MONTH_WITH_28_DAY",
  MONTH_WITH_MOST_SUNDAY = "MONTH_WITH_MOST_SUNDAY",
}

export const daysOfWeek = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

export const getDayOfWeek = (date: any) => {
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};
