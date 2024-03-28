import { ReactNode, useContext } from 'react';
import { Spinner } from 'react-bootstrap';

import { Lens, Lenses } from '@/Lenses';
import { TableEmptyBody, TableContext } from '@/Table';
import { BaseComponentProps } from '@/types';
import { getModelName } from '@/utils';

import { ModelIndexContext, TableState } from './ModelIndexContext';

export interface ModelIndexTableEmptyBodyProps extends BaseComponentProps {
  children?: ReactNode;
}

export const ModelIndexTableEmptyBody = ({
  children,
  id,
  className,
  style,
}: ModelIndexTableEmptyBodyProps) => {
  const { fields, actionsConfig } = useContext(TableContext);
  const { model, tableState } = useContext(ModelIndexContext);
  const modelName = getModelName(model);
  const colSpan = actionsConfig?.showActions
    ? fields.length + 1
    : fields.length;
  return (
    <TableEmptyBody id={id} className={className} style={style}>
      {children === undefined ? (
        <Lenses activeLens={tableState}>
          <Lens lens={TableState.EMPTY}>
            <tr>
              <td colSpan={colSpan} style={{ textAlign: 'center' }}>
                <i>No records exist for {modelName}</i>
              </td>
            </tr>
          </Lens>
          <Lens lens={TableState.ERROR}>
            <tr>
              <td colSpan={colSpan} style={{ textAlign: 'center' }}>
                <i className='text-danger'>An error occured...</i>
              </td>
            </tr>
          </Lens>
          <Lens lens={TableState.LOADING}>
            <tr>
              <td colSpan={colSpan} style={{ textAlign: 'center' }}>
                <Spinner animation='border' />
              </td>
            </tr>
          </Lens>
        </Lenses>
      ) : (
        children
      )}
    </TableEmptyBody>
  );
};
