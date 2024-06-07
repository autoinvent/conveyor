export const camelToSnakeCase = (str: string) => {
  if (!str) return '';
  return str
    .replace(/[a-z](?=[A-Z])|[A-Z](?=[A-Z][a-z])/g, '$&_')
    .toLowerCase();
};

export const snakeToCamelCase = (str: string) => {
  if (!str) return '';
  return str.replace(
    /_([a-z])/g,
    (match, letter) => `${upperCaseFirst(letter)}`,
  );
};

export const humanizeText = (str: string) => {
  if (!str) return '';
  const camelCaseStr = snakeToCamelCase(str);
  const separatedWords = camelCaseStr.replace(
    /[a-z](?=[A-Z])|[A-Z](?=[A-Z][a-z])/g,
    '$& ',
  );
  return upperCaseFirst(separatedWords);
};

export const upperCaseFirst = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateUID = (prefix = 'UID') => {
  return `${prefix}-${crypto.randomUUID()}`;
};
