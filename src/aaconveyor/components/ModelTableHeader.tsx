import { ReactNode } from 'react';

import { BaseComponentProps, ModelField } from '../types';
import { getFieldName } from '../utils';
import Slot from './Slot';

interface ModelTableHeaderProps extends BaseComponentProps {
    field: ModelField;
    children?: ReactNode;
}

const ModelTableHeader = ({
    field,
    children,
    id,
    className,
}: ModelTableHeaderProps) => {
    const fieldName = getFieldName(field);
    return (
        <Slot slotKey={fieldName}>
            <th id={id} className={className}>
                {children}
            </th>
        </Slot>
    );
};

export default ModelTableHeader;
