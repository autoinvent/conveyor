import { ElementType } from 'react';

import { useData } from '@/ModelData';
import { Field } from '@/types';
import { getFieldName, isRelationship, getFieldType } from '@/utils';

export interface FieldValueProps {
    field: Field;
    Component?: ElementType;
    props?: Record<string, any>;
}
export const FieldValue = ({ field, Component, props }: FieldValueProps) => {
    const data = useData();
    const fieldName = getFieldName(field);
    const fieldType = getFieldType(field);
    const fieldRelationship = isRelationship(field);
    let Value = Component;
    if (!Value) {
        if (fieldRelationship) {
            Value = (props) => <>{props.data[fieldName]?.id}</>;
        } else {
            switch (fieldType) {
                case 'Int':
                case 'Float':
                case 'Boolean':
                case 'Datetime':
                case 'String':
                default:
                    Value = (props) => <>{props.data[fieldName]}</>;
            }
        }
    }
    return <Value {...props} data={data} />;
};
