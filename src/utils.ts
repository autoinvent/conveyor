import { Field } from '@/types';

export const getFieldName = (field: Field) => {
    return typeof field === 'string' ? field : field.name;
};

export const getFieldType = (field: Field) => {
    const fieldType = typeof field === 'string' ? 'String' : field.type;
    return typeof fieldType === 'string' ? fieldType : fieldType.type;
};

export const getFieldRequired = (field: Field) => {
    return typeof field === 'string' ? false : field.required;
};

export const isRelationship = (field: Field) => {
    const fieldType = typeof field === 'string' ? 'String' : field.type;
    return typeof fieldType === 'object';
};

export const snakeToCamelCase = (str: string) => {
    if (!str) return '';
    return str.replace(/_([a-z])/g, (match, char) => char.toUpperCase());
};

export const humanizeText = (str: string) => {
    if (!str) return '';
    const separatedWords = snakeToCamelCase(str).replace(
        /([a-z])([A-Z])/g,
        '$1 $2',
    );
    return upperCaseFirst(separatedWords);
};

export const upperCaseFirst = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};
