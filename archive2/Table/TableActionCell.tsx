import { ReactNode } from 'react';

import { Slot } from '@/Slots';
import { BaseComponentProps } from '@/types';


export const TABLE_ACTION_CELL_SLOT = 'table-action-cell-slot'

export interface TableActionCellProps extends BaseComponentProps {
    children?: ReactNode;
}

export const TableActionCell = ({
    children,
    id,
    className,
    style,
}: TableActionCellProps) => {
    return (
        <Slot slotKey={TABLE_ACTION_CELL_SLOT}>
            <td id={id} className={className} style={style}>
                {children}
            </td>
        </Slot>
    );
};
