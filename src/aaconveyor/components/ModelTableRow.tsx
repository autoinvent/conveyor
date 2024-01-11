import { ReactNode, useContext } from 'react';

import { ACTION_SLOT } from '../constants';
import { DisplayKeyProvider } from '../contexts/DisplayKeyContext';
import { ModelTableContext } from '../contexts/ModelTableContext';
import { SlotsProvider } from '../contexts/SlotsContext';
import { BaseComponentProps } from '../types';
import { getFieldName } from '../utils';
import DefaultDisplayValue from './DefaultDisplayValue';
import DefaultDisplayInput from './DefaultDisplayInput';
import ModelActionButtons from './ModelActionButtons';
import ModelTableCell from './ModelTableCell';

interface ModelTableRowProps extends BaseComponentProps {
  children?: ReactNode;
}

const ModelTableRow = ({ children, id, className }: ModelTableRowProps) => {
  const { fields, editable, initialDisplayKey } = useContext(ModelTableContext);
  const slotKeys = fields.map((field) => getFieldName(field));
  if (editable) slotKeys.push(ACTION_SLOT);
  return (
    <tr id={id} className={className}>
      <DisplayKeyProvider value={initialDisplayKey}>
        <SlotsProvider slotKeys={slotKeys}>
          {fields.map((field, index) => (
            <ModelTableCell key={index} field={field}>
              <DefaultDisplayValue field={field} />
              <DefaultDisplayInput field={field} />
            </ModelTableCell>
          ))}
          <ModelTableCell field={ACTION_SLOT}>
            <ModelActionButtons />
          </ModelTableCell>
          {children}
        </SlotsProvider>
      </DisplayKeyProvider>
    </tr>
  );
};

export default ModelTableRow;
