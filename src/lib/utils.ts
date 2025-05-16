import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function combineDateTime(
  date: Date,
  timeStr: string,
  timeFormat: 'AM' | 'PM'
): Date {
  const [hoursStr, minutesStr] = timeStr.split(':');
  let hours = Number.parseInt(hoursStr, 10);
  const minutes = Number.parseInt(minutesStr || '0', 10);

  // Convert to 24-hour format
  if (timeFormat === 'PM' && hours < 12) {
      hours += 12;
  } else if (timeFormat === 'AM' && hours === 12) {
      hours = 0;
  }

  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

