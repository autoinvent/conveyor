import { ReactNode, useContext } from 'react';

import { ACTION_SLOT } from '../constants';
import { ModelTableContext } from '../contexts/ModelTableContext';
import { SlotsProvider } from '../contexts/SlotsContext';
import { BaseComponentProps } from '../types';
import { getFieldName } from '../utils';

interface ModelTableHeadProps extends BaseComponentProps {
  children: ReactNode;
}

const ModelTableHead = ({ children, id, className }: ModelTableHeadProps) => {
  const { fields, editable } = useContext(ModelTableContext);
  const slotKeys = fields.map((field) => getFieldName(field));
  if (editable) slotKeys.push(ACTION_SLOT);
  return (
    <thead id={id} className={className}>
      <tr>
        <SlotsProvider slotKeys={slotKeys}></SlotsProvider>
      </tr>
    </thead>
  );
};

export default ModelTableHead;
