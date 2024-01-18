import { ReactNode, useContext } from 'react';

import { MODEL_TABLE_ACTION_SLOT } from '../constants';
import { ModelTableContext } from '../contexts/ModelTableContext';
import { SlotsProvider } from '../contexts/SlotsContext';
import { BaseComponentProps } from '../types';
import { getFieldName, humanizeText } from '../utils';
import ModelTableHeader from './ModelTableHeader';

interface ModelTableHeadProps extends BaseComponentProps {
  children?: ReactNode;
}

const ModelTableHead = ({ children, id, className }: ModelTableHeadProps) => {
  const { fields, showActions } = useContext(ModelTableContext);
  const slotKeys = fields.map((field) => getFieldName(field));
  if (showActions) slotKeys.push(MODEL_TABLE_ACTION_SLOT);
  return (
    <thead id={id} className={className}>
      <tr>
        <SlotsProvider slotKeys={slotKeys}>
          {fields.map((field, index) => (
            <ModelTableHeader key={index} field={field}>
              {humanizeText(getFieldName(field))}
            </ModelTableHeader>
          ))}
          <ModelTableHeader field={MODEL_TABLE_ACTION_SLOT} />
          {children}
        </SlotsProvider>
      </tr>
    </thead>
  );
};

export default ModelTableHead;
