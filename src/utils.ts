import { MQLRequest } from './contexts/Conveyor';
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

export const camelToSnakeCase = (str: string) => {
    if (!str) return '';
    return str.replace(/[a-z](?=[A-Z])|[A-Z](?=[A-Z][a-z])/g, '$&_').toLowerCase()
};

export const humanizeText = (str: string) => {
    if (!str) return '';
    const separatedWords = str.replace(/[a-z](?=[A-Z])|[A-Z](?=[A-Z][a-z])/g, '$& ')
    return upperCaseFirst(separatedWords);
};

export const upperCaseFirst = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};


export const handleMQLErrors = (error: any): string[] => {
    let errorMessages = [];
    if (typeof error?.message === 'string') {
        const matches = error.message.match(/\{".*\}/g);
        if (matches) {
            const parsedError = JSON.parse(matches[0]);
            const mqlError = parsedError;
            errorMessages = mqlError.response.errors.map((err: Error) => err.message)

        } else {
            errorMessages = [error.message]
        }
    } else {
        console.log('lemme know')
    }
    return errorMessages
}