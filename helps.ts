import { CHINESE_ZODIACS } from "./contants";

export const getZodiacOfYear = (year: number) => {
  switch (year % 12) {
    case 0:
      return CHINESE_ZODIACS["Thân"];
    case 1:
      return CHINESE_ZODIACS["Dậu"];
    case 2:
      return CHINESE_ZODIACS["Tuất"];
    case 3:
      return CHINESE_ZODIACS["Hợi"];
    case 4:
      return CHINESE_ZODIACS["Tí"];
    case 5:
      return CHINESE_ZODIACS["Sửu"];
    case 6:
      return CHINESE_ZODIACS["Dần"];
    case 7:
      return CHINESE_ZODIACS["Mão"];
    case 8:
      return CHINESE_ZODIACS["Thìn"];
    case 9:
      return CHINESE_ZODIACS["Tỵ"];
    case 10:
      return CHINESE_ZODIACS["Ngọ"];
    case 11:
      return CHINESE_ZODIACS["Mùi"];
  }
};
