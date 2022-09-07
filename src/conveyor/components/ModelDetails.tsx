import { useCallback, useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  ListGroup,
  Row,
  Col,
  ButtonGroup,
  Button,
  Form,
} from 'react-bootstrap';
import Select from 'react-select';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DetailField, RelFieldOption, DetailFieldValue } from '../commons/types';
import { getAllModelNames, toModelListName } from '../schema';

type ModelDetailProps = {
  detailFields: DetailField[];
  relFieldOptions: Record<string, RelFieldOption>;
  mode: string;
  updateData: () => void;
};

function ModelDetails({
  detailFields,
  relFieldOptions,
  mode,
  updateData,
}: ModelDetailProps) {
  const [zodSchema, formDefaultValues] = useMemo(() => {
    const schema = zod.object({});
    const defaultValues: Record<string, DetailFieldValue> = {};
    detailFields.forEach(({ fieldName, fieldValue, fieldType, required }) => {
      defaultValues[fieldName] = fieldValue;
      if (typeof fieldValue !== 'string') {
        // schema.merge(
        //   zod.object({
        //     [fieldName]: zod.object()
        //   }),
        // );
      } else {
        schema.merge(
          zod.object({
            [fieldName]: zod.string().min(1, { message: `${fieldName} is required!` }),
          }),
        );
      }
    });
    return [schema, defaultValues];
  }, [detailFields]);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formDefaultValues,
    resolver: zodResolver(zodSchema),
  });
  console.log(detailFields);
  return (
    <Container>
      <Form>
        <ListGroup>
          {detailFields.map(
            ({ fieldName, fieldValue, fieldType, fieldLink, required }) => {
              return (
                <ListGroup.Item key={`model-detail-${fieldName}-list-group-item`}>
                  <Form.Group>
                    <Row>
                      <Col>
                        <Form.Label>{fieldName}:</Form.Label>
                      </Col>
                      <Col>
                        <Controller
                          name={fieldName}
                          control={control}
                          render={({ field: { onChange, onBlur, value, ref } }) => {
                            const formControlProps: Record<string, string | any> = {
                              onChange,
                              onBlur,
                              ref,
                              value,
                              isInvalid: Boolean(errors[fieldName]),
                            };
                            const relationalType = typeof fieldValue !== 'string';
                            const options = relFieldOptions[fieldType];
                            if (relationalType) {
                              formControlProps.as = Select;
                              formControlProps.options = options;
                              formControlProps.isMulti = fieldType !== fieldLink;
                            }
                            /* eslint-disable-next-line react/jsx-props-no-spreading */
                            return <Form.Control {...formControlProps} />;
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors[fieldName]?.message}
                        </Form.Control.Feedback>
                      </Col>
                    </Row>
                  </Form.Group>
                </ListGroup.Item>
              );

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
                    <Col>{fieldName}:</Col>
                    <Col>{fieldValueDisplay}</Col>
                  </Row>
                </ListGroup.Item>
              );
            },
          )}
        </ListGroup>
        <Row className="mt-3">
          <Col className="m2 d-grid" md={{ span: 2, offset: 4 }}>
            <Button variant="secondary">Cancel</Button>
          </Col>
          <Col className="d-grid" md={{ span: 2, offset: 0 }}>
            <Button variant="primary">Save</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ModelDetails;
