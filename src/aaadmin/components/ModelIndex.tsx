import { ReactNode, useContext } from 'react';
import { Container } from 'react-bootstrap';

import ModelTable from '../../aaconveyor/components/ModelTable';
import { ModelTableProvider } from '../../aaconveyor/contexts/ModelTableContext';
import { BaseComponentProps, Field } from '../../aaconveyor/types';

// TODO: REMOVE
import ModelTableHead from '../../aaconveyor/components/ModelTableHead';
import ModelTableHeader from '../../aaconveyor/components/ModelTableHeader';
import ModelTableCell from '../../aaconveyor/components/ModelTableCell';
import ModelTableBody from '../../aaconveyor/components/ModelTableBody';
import ModelTableRow from '../../aaconveyor/components/ModelTableRow';
import ModelTablePagination from '../../aaconveyor/components/ModelTablePagination';
import ModelHeading from '../../aaconveyor/components/ModelHeading';
import ModelTitle from '../../aaconveyor/components/ModelTitle';
import { LIST_QUERY } from '../constants/common';
import { ConveyorContext } from '../contexts/ConveyorContext';
import {
  generateOperationName,
  generateGQLQueryDocument,
} from '../utils/common';

interface ModelIndexProps extends BaseComponentProps {
  modelName: string;
  fields: Field[];
  children?: ReactNode;
}

const ModelIndex = ({
  modelName,
  fields,
  children,
  id,
  className,
}: ModelIndexProps) => {
  const { useGQLQueryResponse } = useContext(ConveyorContext);
  const operation = generateOperationName(modelName, LIST_QUERY);
  const document = generateGQLQueryDocument(modelName, fields, LIST_QUERY);
  const { data, errors } = useGQLQueryResponse({ operation, document });
  return (
    <Container id={id} className={className}>
      {data?.[operation] && (
        <ModelTableProvider
          title={modelName}
          data={data[operation].items}
          fields={fields}
        >
          {children !== undefined ? (
            children
          ) : (
            <>
              <ModelTable />
            </>
          )}
        </ModelTableProvider>
      )}
    </Container>
  );
};

export default ModelIndex;
