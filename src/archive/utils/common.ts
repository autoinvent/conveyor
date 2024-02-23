import { ErrorMessage } from '../enums';

export const humanizeText = (str: string) => {
  if (!str) return '';
  const separatedWords = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  return upperCaseFirst(separatedWords);
};

export const upperCaseFirst = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const lowerCaseFirst = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const parseResponseError = (
  errorMessages: string | string[] | Error,
) => {
  if (Array.isArray(errorMessages)) {
    return errorMessages;
  } else if (typeof errorMessages === 'string') {
    return [errorMessages];
  } else if (errorMessages?.message) {
    return [errorMessages.message];
  } else {
    throw Error(ErrorMessage.UNKNOWN_ERROR, errorMessages);
  }
};
