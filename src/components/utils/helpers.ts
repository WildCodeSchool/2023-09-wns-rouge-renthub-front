import { format } from "date-fns";

export function dateformater(date: Date) {
  return new Date(format(date, "yyyy-MM-dd")).toISOString();
}
