import { ReactNode, useContext } from 'react';

import { FieldValue } from '@/components/FieldValue'
import { Slots } from '@/contexts/Slots'
import { TableContext } from '@/contexts/TableContext';
import { BaseComponentProps } from '@/types';
import { getFieldName } from '@/utils';

import { TableCell } from './TableCell'

export interface TableRowProps extends BaseComponentProps {
    children?: ReactNode;
}

export const TableRow = ({ children, id, className, style }: TableRowProps) => {
    const { fields } = useContext(TableContext);
    const fieldNames = fields.map((field) => getFieldName(field));
    return (
        <tr id={id} className={className} style={style}>
            <Slots slotKeys={fieldNames}>
                {fields.map((field, index) => (
                    <TableCell key={index} field={field}>
                        <FieldValue field={field} />
                    </TableCell>
                ))}
                {children}
            </Slots>
        </tr>
    );
};

