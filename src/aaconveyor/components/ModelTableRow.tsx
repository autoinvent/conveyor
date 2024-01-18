import { ReactNode, useContext } from 'react';

import { MODEL_TABLE_ACTION_SLOT } from '../constants';
import { DisplayKeyProvider, DisplayKeys } from '../contexts/DisplayKeyContext';
import { ModelTableContext } from '../contexts/ModelTableContext';
import { SlotsProvider } from '../contexts/SlotsContext';
import { BaseComponentProps } from '../types';
import { getFieldName } from '../utils';
import ModelTableActionButtons from './ModelTableActionButtons';
import Display from './Display';
import ModelInput from './ModelInput';
import ModelTableCell from './ModelTableCell';
import ModelValue from './ModelValue';

interface ModelTableRowProps extends BaseComponentProps {
  children?: ReactNode;
}

const ModelTableRow = ({ children, id, className }: ModelTableRowProps) => {
  const { fields, showActions, initialDisplayKey } =
    useContext(ModelTableContext);
  const slotKeys = fields.map((field) => getFieldName(field));
  if (showActions) slotKeys.push(MODEL_TABLE_ACTION_SLOT);
  return (
    <tr id={id} className={className}>
      <DisplayKeyProvider value={initialDisplayKey}>
        <SlotsProvider slotKeys={slotKeys}>
          {fields.map((field, index) => (
            <ModelTableCell key={index} field={field}>
              <Display activeKey={DisplayKeys.VALUE}>
                <ModelValue field={field} />
              </Display>
              <Display activeKey={DisplayKeys.EDIT}>
                <ModelInput field={field} />
              </Display>
            </ModelTableCell>
          ))}
          <ModelTableCell field={MODEL_TABLE_ACTION_SLOT}>
            <ModelTableActionButtons />
          </ModelTableCell>
          {children}
        </SlotsProvider>
      </DisplayKeyProvider>
    </tr>
  );
};

export default ModelTableRow;
