import { ReactNode, useContext, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import {
    FaRegTrashAlt,
    FaEdit,
    FaRegSave,
    FaRegTimesCircle,
} from 'react-icons/fa';

import { FlexibleValues } from '@/FlexibleValues'
import { Lenses, Lens } from '@/Lenses'
import { Slots } from '@/Slots'
import { BaseComponentProps } from '@/types';
import { getFieldName, getFieldType, getFieldRequired } from '@/utils';

import { TableCell } from './TableCell'
import { TABLE_ACTION_CELL_SLOT, TableActionCell } from './TableActionCell'
import { TableContext } from './TableContext';

import { useData } from '@/Data';
import { FlexibleInputs } from '..';


export enum TableRowState {
    EDIT,
    VALUE,
}

export interface TableRowProps extends BaseComponentProps {
    children?: ReactNode;
}

export const TableRow = ({ children, id, className, style }: TableRowProps) => {
    const { data, register, reset } = useData();
    const { fields, actionsConfig } = useContext(TableContext);
    const fieldNames = fields.map((field) => getFieldName(field));
    const [editing, setEditing] = useState(TableRowState.VALUE)

    const onEdit = () => setEditing(TableRowState.EDIT)
    const onCancelEdit = () => {
        setEditing(TableRowState.VALUE)
        reset()
    }
    const onSave = () => { actionsConfig?.onSave?.() }
    const onDelete = () => { actionsConfig?.onDelete?.() }
    if (actionsConfig?.showActions) fieldNames.push(TABLE_ACTION_CELL_SLOT)
    return (
        <tr id={id} className={className} style={style}>
            <Lenses activeLens={editing}>
                <Slots slotKeys={fieldNames}>
                    {fields.map((field, index) => {
                        const fieldName = getFieldName(field)
                        const fieldType = getFieldType(field)
                        const fieldRequired = getFieldRequired(field)
                        const fieldData = data?.[fieldName]
                        return (
                            <TableCell key={index} field={field}>
                                <Lens lens={TableRowState.VALUE}>
                                    <FlexibleValues valueType={fieldType} data={fieldData} />
                                </Lens>
                                <Lens lens={TableRowState.EDIT}>
                                    <FlexibleInputs
                                        valueType={fieldType}
                                        data={fieldData}
                                        inputProps={{ ...register(fieldName, { required: fieldRequired }) }}
                                    />
                                </Lens>
                            </TableCell>
                        )
                    })}
                    <TableActionCell>
                        <ButtonGroup>
                            <Lens lens={TableRowState.VALUE}>
                                <Button variant='outline-primary' onClick={onEdit}>
                                    <FaEdit />
                                </Button>
                                <Button variant='outline-danger' onClick={onDelete}>
                                    <FaRegTrashAlt />
                                </Button>
                            </Lens>
                            <Lens lens={TableRowState.EDIT}>
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

