import { ReactNode, useContext } from 'react';

import { Slot, Slots } from '@/Slots'
import { BaseComponentProps } from '@/types';
import { getFieldName, humanizeText } from '@/utils';

import { TableContext } from './TableContext';
import { TableHeader } from './TableHeader'

export const TABLE_HEAD_SLOT = 'table-head-slot'

export interface TableHeadProps extends BaseComponentProps {
    children?: ReactNode;
}

export const TableHead = ({ children, id, className, style }: TableHeadProps) => {
    const { fields } = useContext(TableContext);
    const fieldNames = fields.map((field) => getFieldName(field));
    return (
        <Slot slotKey={TABLE_HEAD_SLOT}>
            <thead id={id} className={className} style={style}>
                <tr>
                    <Slots slotKeys={fieldNames}>
                        {fields.map((field, index) => (
                            <TableHeader key={index} field={field}>
                                {humanizeText(getFieldName(field))}
                            </TableHeader>
                        ))}
                        {children}
                    </Slots>
                </tr>
            </thead>
        </Slot>
    );
};
