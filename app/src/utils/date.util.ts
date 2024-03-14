import { format } from "date-fns";

export const formatDateString = (
  date: Date,
  formatStr: string = "yyyy-MM-dd"
): string => {
  return format(date, formatStr);
};
