import { ErrorMessage } from "../enums";

export const humanizeText = (str: string) => {
  if (!str) return "";
  const separatedWords = str.replace(/(?=[A-Z][a-z])/g, " ");
  return upperCaseFirst(separatedWords);
};

export const upperCaseFirst = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const lowerCaseFirst = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const parseResponseError = (error: any) => {
  let errorMessages = null;
  if (typeof error?.message === "string") {
    const matches = error.message.match(/\{".*\}/g);
    if (matches) {
      const parsedError = JSON.parse(matches[0]);
      error = parsedError;
    }
  }
  if (error?.response) {
    if (error.response?.status === 404) {
      errorMessages = [ErrorMessage.GQL_ENDPT_DNE];
    } else if (Array.isArray(error?.response?.errors)) {
      errorMessages = error.response.errors.map((err: any) => err.message);
    }
  }
  if (!errorMessages) {
    throw Error(ErrorMessage.UNKNOWN_ERROR + error.message);
  }
  return errorMessages;
};
