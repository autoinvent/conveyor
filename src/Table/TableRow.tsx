import { ReactNode, useContext, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import {
    FaRegTrashAlt,
    FaEdit,
    FaRegSave,
    FaRegTimesCircle,
} from 'react-icons/fa';

import { FieldValue } from '@/ModelValue'
import { Lenses, Lens } from '@/Lenses'
import { Slots } from '@/Slots'
import { BaseComponentProps } from '@/types';
import { getFieldName } from '@/utils';

import { TableCell } from './TableCell'
import { TABLE_ACTION_CELL_SLOT, TableActionCell } from './TableActionCell'
import { TableContext } from './TableContext';

export interface TableRowProps extends BaseComponentProps {
    children?: ReactNode;
}

export const TableRow = ({ children, id, className, style }: TableRowProps) => {
    const { fields, actionsConfig } = useContext(TableContext);
    const fieldNames = fields.map((field) => getFieldName(field));
    const [editing, setEditing] = useState(false)

    const onEdit = () => setEditing(true)
    const onCancelEdit = () => setEditing(false)
    const onSave = () => { actionsConfig?.onSave?.() }
    const onDelete = () => { actionsConfig?.onDelete?.() }

    if (actionsConfig?.showActions) fieldNames.push(TABLE_ACTION_CELL_SLOT)
    return (
        <tr id={id} className={className} style={style}>
            <Lenses activeLens={editing}>
                <Slots slotKeys={fieldNames}>
                    {fields.map((field, index) => (
                        <TableCell key={index} field={field}>
                            <Lens lens={false}>
                                <FieldValue field={field} />
                            </Lens>
                            <Lens lens={true}>
                                'hello'
                            </Lens>
                        </TableCell>
                    ))}
                    <TableActionCell>
                        <ButtonGroup>
                            <Lens lens={false}>
                                <Button variant='outline-primary' onClick={onEdit}>
                                    <FaEdit />
                                </Button>
                                <Button variant='outline-danger' onClick={onDelete}>
                                    <FaRegTrashAlt />
                                </Button>
                            </Lens>
                            <Lens lens={true}>
                                <Button variant='outline-success' onClick={onSave}>
                                    <FaRegSave />
                                </Button>
                                <Button variant='outline-primary' onClick={onCancelEdit}>
                                    <FaRegTimesCircle />
                                </Button>
                            </Lens>
                        </ButtonGroup>
                    </TableActionCell>
                    {children}
                </Slots>
            </Lenses>
        </tr>
    );
};

