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

export const humanizeText = (str = '') => {
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

// CAUTION: Infinite loop on circular references
export const deepObjectMerge = (
  target: Record<string, any>,
  ...sources: Record<string, any>[]
): Record<string, any> => {
  if (!sources.length) return target;
  const source = sources.shift();
  if (
    typeof target !== 'object' ||
    typeof source !== 'object' ||
    Array.isArray(target) ||
    Array.isArray(source)
  ) {
    throw new Error(
      'target and sources needs to be of type Record<string, any>',
    );
  }

  // biome-ignore lint/complexity/noForEach: not a sparse array
  Object.keys(source).forEach((key) => {
    if (typeof source[key] === 'object') {
      if (target[key]) {
        deepObjectMerge(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  });
  return deepObjectMerge(target, ...sources);
};
