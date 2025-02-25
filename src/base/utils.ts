import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const camelToSnakeCase = (str: string) => {
  if (!str) return '';
  return str
    .replace(/[a-z](?=[A-Z])|[A-Z](?=[A-Z][a-z])/g, '$&_')
    .toLowerCase();
};

export const snakeToCamelCase = (str: string) => {
  if (!str) return '';
  return str.replace(/_([a-z0-9])/g, (_, char) => `${upperCaseFirst(char)}`);
};

export const humanizeText = (str = '') => {
  if (!str) return '';
  const camelCaseStr = snakeToCamelCase(str);
  const separatedWords = camelCaseStr.replace(
    /[a-z](?=[A-Z0-9])|[A-Z](?=[A-Z][a-z]|[0-9])|[0-9](?=[a-zA-Z])/g,
    '$& ',
  );
  return upperCaseFirst(separatedWords);
};

export const upperCaseFirst = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
