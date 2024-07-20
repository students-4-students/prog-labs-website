import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitle(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
