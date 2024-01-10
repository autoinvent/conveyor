import { ReactNode, useContext } from 'react';

import { ModelTableContext } from '../__contexts__/ModelTableContext';
import { SlotsContext } from '../__contexts__/SlotsContext';
import { BaseComponentProps } from '../__types';
import { getFieldName } from '../__utils__';
import ModelActionButtons from './ModelActionButtons';

interface ModelTableRowProps extends BaseComponentProps {
  initialDisplayKey?: string;
  children?: ReactNode;
}

const ModelTableRow = ({ children, className }: ModelTableRowProps) => {
  const slots = useContext(SlotsContext);
  const { fields } = useContext(ModelTableContext);

  return (
    <tr className={className}>
      {fields.map((field, index) => (
        <td key={index}>{slots[getFieldName(field)]}</td>
      ))}
      <td>fieldDisplays</td>
      {children}
    </tr>
  );
};

export default ModelTableRow;
