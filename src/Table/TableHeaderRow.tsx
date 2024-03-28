import { useStore } from '@tanstack/react-store';

import { Slots, Slot } from '@/Slots';
import { CommonProps, WrapperProp } from '@/types';
import { humanizeText } from '@/utils';

import { TableHeaderCell } from './TableHeaderCell';
import { useTableStore } from './useTableStore';

export interface TableHeaderRowProps extends WrapperProp, CommonProps { }

export const TableHeaderRow = ({ children, id, className, style }: TableHeaderRowProps) => {
    const tableStore = useTableStore();
    const columnIds = useStore(tableStore, (state) => state.columnIds);
    return (
        <tr id={id} className={className} style={style}>
            <Slots slotOrder={columnIds}>
                {children === undefined ?
                    columnIds.map((columnId) => {
                        return (
                            <TableHeaderCell key={columnId} columnId={columnId}>
                                {humanizeText(columnId)}
                            </TableHeaderCell>
                        )
                    })
                    : children}
            </Slots>
        </tr>
    );
};
