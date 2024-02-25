import { ReactNode } from 'react';

import { Slot } from '@/components/Slot';
import { BaseComponentProps, Field } from '@/types';
import { getFieldName } from '@/utils';

export interface TableCellProps extends BaseComponentProps {
    field: Field;
    children?: ReactNode;
}

export const TableCell = ({
    field,
    children,
    id,
    className,
    style,
}: TableCellProps) => {
    const fieldName = getFieldName(field);
    return (
        <Slot slotKey={fieldName}>
            <td id={id} className={className} style={style}>
                {children}
            </td>
        </Slot>
    );
};
