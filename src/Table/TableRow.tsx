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
import { Slots, Slot } from '@/Slots'
import { BaseComponentProps } from '@/types';
import { getFieldName, getFieldType, getFieldRequired, humanizeText } from '@/utils';

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
    prefilled?: boolean
    children?: ReactNode;
}

export const TableRow = ({ prefilled = true, children, id, className, style }: TableRowProps) => {
    const { data, errors, onSaveHandler, formMethods } = useData();
    const { fields, actionsConfig } = useContext(TableContext);
    const fieldNames = fields.map((field) => getFieldName(field));
    const [editing, setEditing] = useState(TableRowState.VALUE)
    const onEdit = () => setEditing(TableRowState.EDIT)
    const onCancelEdit = () => {
        setEditing(TableRowState.VALUE)
        formMethods.reset()
    }
    const onSave = onSaveHandler(actionsConfig?.onSave)
    const onDelete = () => { actionsConfig?.onDelete?.() }
    if (actionsConfig?.showActions) fieldNames.push(TABLE_ACTION_CELL_SLOT)
    return (
        <tr id={id} className={className} style={style}>
            <Lenses activeLens={editing}>
                {children === undefined || prefilled ? <Slots slotKeys={fieldNames}>
                    {fields.map((field, index) => {
                        const fieldName = getFieldName(field)
                        const fieldType = getFieldType(field)
                        const fieldRequired = getFieldRequired(field)
                        const fieldData = data?.[fieldName]
                        const fieldError = errors?.[fieldName]?.message as string
                        return (
                            <TableCell key={index} field={field}>
                                <Lens lens={TableRowState.VALUE}>
                                    <FlexibleValues valueType={fieldType} value={fieldData} />
                                </Lens>
                                <Lens lens={TableRowState.EDIT}>
                                    <FlexibleInputs
                                        valueType={fieldType}
                                        value={fieldData}
                                        errors={fieldError}
                                        inputProps={{ ...formMethods.register(fieldName, { required: { value: Boolean(fieldRequired), message: `${humanizeText(fieldName)} is required` } }) }}
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
                </Slots> : null
                }
            </Lenses>
        </tr>
    );
};

