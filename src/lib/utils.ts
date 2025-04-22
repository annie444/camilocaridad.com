import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isString(
  value: String | string | undefined | null
): asserts value is String {
  if (!(typeof value === 'string' || value instanceof String)) {
    throw new Error('Not a string');
  }
}

export function isArray<T>(
  value: Array<T> | undefined | null
): asserts value is Array<T> {
  if (Object.prototype.toString.call(value) !== '[object Array]') {
    throw new Error('Not an array');
  }
}

export function isArrayString(
  value: Array<String> | Array<string> | undefined | null
): asserts value is Array<String> {
  isArray(value);
  isString(value[0]);
}

export function round(value: number, precision: number): number {
  const parts = new String(value).split('.');
  if (parts.length === 1) {
    return new Number(parts[0]) as number;
  }
  return new Number(
    `${parts[0]}.${parts[1].slice(0, precision + 1)}`
  ) as number;
}
