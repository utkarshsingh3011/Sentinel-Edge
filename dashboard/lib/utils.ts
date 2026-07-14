import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRelativeTimeString(timestampStr?: string): string {
  if (!timestampStr) return "Never";
  const date = new Date(timestampStr);
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (elapsedSeconds < 60) {
    return `${elapsedSeconds} sec ago`;
  }
  const mins = Math.floor(elapsedSeconds / 60);
  if (mins < 60) {
    return `${mins} min ago`;
  }
  const hours = Math.floor(mins / 60);
  return `${hours} hr ago`;
}
