import { ReactNode, useContext } from 'react';

import { ACTION_SLOT } from '../constants';
import { DisplayKeyProvider, DisplayKeys } from '../contexts/DisplayKeyContext';
import { ModelTableContext } from '../contexts/ModelTableContext';
import { SlotsProvider } from '../contexts/SlotsContext';
import { BaseComponentProps } from '../types';
import { getFieldName } from '../utils';
import ModelActionButtons from './ModelActionButtons';
import Display from './Display';
import ModelInput from './ModelInput'
import ModelTableCell from './ModelTableCell';
import ModelValue from './ModelValue'


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
              <Display activeKey={DisplayKeys.VALUE}>
                <ModelValue field={field} />
              </Display>
              <Display activeKey={DisplayKeys.EDIT}>
                <ModelInput field={field} />
              </Display>
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
