import { takeEntries } from "@/utils/takeEntries";

interface IFontSize {
  [key: number]: string;
}

export const defaultFontSizeOptions: IFontSize = {
  10: "14px",
  20: "16px",
  30: "22px",
  40: "28px",
};

export const fontSizeQuizOptions = takeEntries(defaultFontSizeOptions, 3);
