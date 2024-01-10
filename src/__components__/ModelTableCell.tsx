import { ReactNode, useContext, useEffect } from 'react';

import { SetModelFieldDisplaysContext } from '../__contexts__/ModelFieldDisplaysContext';
import { ModelField } from '../__types';
import { getFieldName } from '../__utils__';

interface ModelTableCellProps {
  field: ModelField;
  children?: ReactNode;
}

const ModelTableCell = ({ field, children }: ModelTableCellProps) => {
  const setModelFieldDisplays = useContext(SetModelFieldDisplaysContext);
  useEffect(() => {
    setModelFieldDisplays((tableCells) => ({
      ...tableCells,
      [getFieldName(field)]: children,
    }));
  }, [field, children]);
  return null;
};

export default ModelTableCell;
