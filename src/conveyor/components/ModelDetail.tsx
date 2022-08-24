import { useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';

import { DataManagerProps, GraphqlFetchResult } from '../commons/types';
import { getAllModelNames, toModelListName } from '../schema';

function ModelDetail({ schema, gqlFetcher }: DataManagerProps) {
  if (!schema) throw new Error();
  const { modelName: currentModelName, modelId: currentModelId } = useParams();
  if (!currentModelName) throw new Error();
  const currentModel = schema.models.find((model) => model.name === currentModelName);
  if (!currentModel) throw new Error();
  const currentModelListName = toModelListName(currentModelName);

  const fetchGQLModelDetail = useCallback(async () => {
    // Parses model fields into { name, rel } where rel is the model name of the
    // relational field type
    const allModelNames = getAllModelNames(schema);
    const currentFields = currentModel.fields.map((field) => {
      const fieldRel =
        allModelNames.find(
          (modelName) =>
            typeof field.type !== 'string' && modelName === field.type.name,
        ) ?? '';
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
      query model($id: ID!){
        ${currentModelName}(id: $id) {
          result {
            id ${queryModelFields.join(' ')}
          }
        }
      }
    `;
    const param = {
      query,
      variables: {
        id: currentModelId,
      },
    };
    return gqlFetcher(param).then((response) => {
      const fields = currentFields;
      const { result } = response[currentModelName];
      const data = [result];
      return { currentModelName, fields, data };
    });
  }, [currentModelName, gqlFetcher, schema, currentModel, currentModelId]);

  const { error: errModelDetailData, data: modelDetails } = useQuery<
    GraphqlFetchResult,
    Error
  >(['model', currentModelListName], fetchGQLModelDetail);
  if (errModelDetailData) throw new Error(errModelDetailData.message);
  return (
    <Container>
      <h3>
        <Link to={`/Conveyor/${currentModelName}`}>{currentModelName}</Link>:{' '}
        {currentModelName}
      </h3>
      <ListGroup>
        {modelDetails &&
          modelDetails.fields.map((field) => {
            const fieldName = field.name;
            const fieldNav = field.rel;
            const fieldValue = modelDetails.data[0][fieldName] ?? 'N/A';
            const fieldRelValue =
              !Array.isArray(fieldValue) && typeof fieldValue === 'object'
                ? [fieldValue]
                : fieldValue;
            const fieldValueDisplay = Array.isArray(fieldRelValue)
              ? fieldRelValue.map((relVal, idx) => (
                  <Link
                    key={`model-detail-${fieldName}-${relVal.id}-link`}
                    to={`/Conveyor/${fieldNav}/${relVal.id}`}
                  >
                    {relVal.name}
                    {fieldRelValue.length - 1 > idx ? ', ' : ''}
                  </Link>
                ))
              : fieldRelValue;
            return (
              <ListGroup.Item key={`model-detail-${fieldName}-list-group-item`}>
                <Row>
                  {/* {fieldName} */}
                  <Col>{fieldName}:</Col>
                  <Col>{fieldValueDisplay}</Col>
                </Row>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Container>
  );
}

export default ModelDetail;
