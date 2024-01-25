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
import { LIST_QUERY, UPDATE_MUTATION } from '../constants/common';
import { ConveyorContext } from '../contexts/ConveyorContext';
import {
    generateOperationName,
    generateGQLQueryDocument,
    generateGQLMutationDocument,
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
    const { useGQLQueryResponse, useGQLMutationRequest } = useContext(ConveyorContext);
    const list_operation = generateOperationName(modelName, LIST_QUERY);
    const list_document = generateGQLQueryDocument(modelName, fields, LIST_QUERY);
    const { data, errors } = useGQLQueryResponse({ operation: list_operation, document: list_document });

    const update_operation = generateOperationName(modelName, UPDATE_MUTATION);
    const update_document = generateGQLMutationDocument(modelName, fields, UPDATE_MUTATION);
    const onSave = useGQLMutationRequest({ operation: update_operation, document: update_document })

    return (
        <Container id={id} className={className}>
            {data?.[list_operation] && (
                <ModelTableProvider
                    title={modelName}
                    data={data[list_operation].items}
                    fields={fields}
                    onSave={onSave}
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
