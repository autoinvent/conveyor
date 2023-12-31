import { ReactNode } from 'react';

import { BaseComponentProps, ModelField } from '../__types';
import DefaultDisplayValue from './DefaultDisplayValue';
import DefaultDisplayInput from './DefaultDisplayInput';

interface ModelTableCellProps extends BaseComponentProps {
  field?: ModelField;
  children?: ReactNode;
}

const ModelTableCell = ({
  field,
  children,
  id,
  className,
}: ModelTableCellProps) => {
  return (
    <td id={id} className={className}>
      {field && !children ? (
        <>
          <DefaultDisplayValue field={field} />
          <DefaultDisplayInput field={field} />
        </>
      ) : (
        children
      )}
    </td>
  );
};

export default ModelTableCell;
