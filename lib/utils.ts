import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleDateDefaultValue = (xtime: any) => {
  if (xtime[xtime.length - 1] !== "Z") {
    return xtime;
  }
  let dxtime = new Date(xtime);
  const retVal = new Date(dxtime.getTime() - dxtime.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -8);
  return retVal;
};

export const handleNiceDate = (xtime: any) => {
  if (xtime[xtime.length - 1] !== "Z") {
    return xtime;
  }
  let dxtime = new Date(xtime);
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };
  // @ts-ignore
  return dxtime.toLocaleString("en-GB", options);
};
