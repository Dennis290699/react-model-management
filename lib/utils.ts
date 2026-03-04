import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatStats = (stats: any) => {
  return `${stats.height} • DR ${stats.dress} • B ${stats.bust} • W ${stats.waist} • H ${stats.hips}`;
};