import { useMemo, useCallback } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';

import { DataManagerProps, ModelTableProps } from '../common/types';
import ModelTable from './ModelTable';
import { toModelListName } from '../schema';
import { useConveyorStore } from '../store';

function ModelListIndex({ schema, gqlFetcher }: DataManagerProps) {
  if (!schema) {
    throw new Error();
  }
  const { modelName: currentModelName, navigate } = useConveyorStore();
  if (!currentModelName) {
    throw new Error();
  }
  const currentModel = schema.models.find((model) => model.name === currentModelName);
  if (!currentModel) {
    throw new Error();
  }
  const currentModelListName = toModelListName(currentModelName);
  const fetchGQLModelList = useCallback(async () => {
    // Parses model fields into { name, rel } where rel is the model name of the
    // relational field type
    const currentFields = currentModel.fields.map((field) => {
      const fieldRel = typeof field.type !== 'string' ? field.type.name : '';
      return {
        name: field.name,
        rel: fieldRel,
      };
    });
    // Creates a list of model fields that can be queried by graphQL
    const queryModelFields = currentFields.map((field) =>
      field.rel ? `${field.name} { id, name }` : field.name,
    );
    const query = gql`
      query {
        ${currentModelListName} {
          result {
            ${queryModelFields.join(' ')}
          }
        }
      }
    `;
    const param = {
      request: query,
      variables: {},
    };
    return gqlFetcher(param).then((response) => {
      const fields = currentFields;
      const { result: data } = response[currentModelListName];
      return { currentModelName, fields, data };
    });
  }, [currentModelName, gqlFetcher, currentModel, currentModelListName]);

  const { error: errModelListData, data: modelListData } = useQuery<
    ModelTableProps,
    Error
  >(['model', currentModelListName], fetchGQLModelList);
  // if (errModelListData) throw new Error(errModelListData.message);

  // Memoize so the tableData isn't "new" on every render
  const tableData = useMemo(() => modelListData?.data ?? [], [modelListData]);
  return (
    <Container>
      {modelListData && modelListData?.fields?.length > 0 ? (
        <>
          <Row>
            <Col>
              <h3>{toModelListName(currentModelName)}</h3>
            </Col>
            <Col className="pe-0" style={{ display: 'flex', justifyContent: 'right' }}>
              <Button
                style={{ width: '45px', height: '45px' }}
                onClick={() => {
                  navigate(currentModelName);
                }}
              >
                <strong>+</strong>
              </Button>
            </Col>
          </Row>
          <Row>
            <ModelTable
              currentModelName={modelListData.currentModelName}
              fields={modelListData.fields}
              data={tableData}
            />
          </Row>
        </>
      ) : (
        <h3>No model data exists for {currentModelListName}</h3>
      )}
    </Container>
  );
}

export default ModelListIndex;
