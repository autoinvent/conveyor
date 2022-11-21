import { useCallback, useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, ListGroup, Row, Col, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DetailField, RelFieldOption, DetailFieldValue } from '../commons/types';
import { CREATE_MODE } from '../commons/constants';
import { getAllModelNames, toModelListName } from '../schema';

type ModelDetailProps = {
  detailFields: DetailField[];
  relFieldOptions: Record<string, RelFieldOption[]>;
  loading: boolean;
  mode: string;
  createData: any;
  updateData: any;
  deleteData: any;
};

function ModelDetails({
  detailFields,
  relFieldOptions,
  loading,
  mode,
  createData,
  updateData,
  deleteData,
}: ModelDetailProps) {
  const [zodSchema, formDefaultValues] = useMemo(() => {
    let zSchema = zod.object({});
    const defaultValues: Record<string, DetailFieldValue> = {};
    detailFields.forEach(
      ({ fieldName, fieldValue, fieldLink, fieldType, required }) => {
        switch (fieldType) {
          case 'boolean':
            defaultValues[fieldName] = Boolean(fieldValue);
            zSchema = zSchema.extend({
              [fieldName]: zod.boolean({
                required_error: `${fieldName} is required`,
                invalid_type_error: `${fieldName} must be a boolean`,
              }),
            });
            break;
          case 'ID':
            break;
          case toModelListName(fieldLink):
            defaultValues[fieldName] = fieldValue;
            zSchema = zSchema.extend({
              [fieldName]: zod
                .object({ value: zod.string(), label: zod.string() })
                .array()
                .optional(),
            });
            break;
          case fieldLink:
            defaultValues[fieldName] = fieldValue;
            zSchema = zSchema.extend({
              [fieldName]: zod
                .object({ value: zod.string().nullable(), label: zod.string() })
                .optional(),
            });
            break;
          default:
            defaultValues[fieldName] = fieldValue;
            zSchema = zSchema.extend({
              [fieldName]: zod
                .string({
                  required_error: `${fieldName} is required`,
                  invalid_type_error: `${fieldName} must be a string`,
                })
                .min(Number(required)),
            });
        }
      },
    );
    return [zSchema, defaultValues];
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

  const navigate = useNavigate();

  return (
    <Container>
      <Form onSubmit={handleSubmit(mode === CREATE_MODE ? createData : updateData)}>
        <ListGroup>
          {detailFields.map(({ fieldName, fieldValue, fieldType, fieldLink }) => {
            if (fieldName === 'id') {
              return (
                <ListGroup.Item key={`model-detail-${fieldName}-list-group-item`}>
                  <Row>
                    <Col>id:</Col>
                    <Col>{fieldValue as string}</Col>
                  </Row>
                </ListGroup.Item>
              );
            }
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
                          // Show client data first; fallback to server data
                          const currentValue = value ?? fieldValue;
                          const formControlProps: Record<string, string | any> = {
                            onChange,
                            onBlur,
                            ref,
                            value: currentValue,
                            isInvalid: Boolean(errors[fieldName]),
                          };
                          const options = relFieldOptions[fieldType];
                          if (fieldLink) {
                            const noneOption = { value: null, label: 'None' };
                            formControlProps.as = Select;
                            formControlProps.options =
                              fieldType === fieldLink
                                ? options.concat([noneOption])
                                : options;
                            formControlProps.isMulti = fieldType !== fieldLink;
                          } else if (fieldType === 'boolean') {
                            formControlProps.as = Form.Check;
                            formControlProps.defaultChecked = fieldValue;
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
          })}
        </ListGroup>
        <Row className="mt-3">
          <Col
            className="m2 d-grid"
            md={{ span: 2, offset: mode === CREATE_MODE ? 4 : 3 }}
          >
            <Button onClick={() => navigate(-1)} variant="secondary">
              Cancel
            </Button>
          </Col>
          {mode !== CREATE_MODE && (
            <Col className="m2 d-grid" md={{ span: 2, offset: 0 }}>
              <Button onClick={deleteData} variant="danger">
                Delete
              </Button>
            </Col>
          )}
          <Col className="d-grid" md={{ span: 2, offset: 0 }}>
            <Button type="submit" disabled={loading} variant="primary">
              {mode === CREATE_MODE ? 'Create' : 'Save'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

// const fieldRelValue =
// !Array.isArray(fieldValue) && typeof fieldValue === 'object'
//   ? [fieldValue]
//   : fieldValue;
// const fieldValueDisplay = Array.isArray(fieldRelValue)
// ? fieldRelValue.map((relVal, idx) => (
//     <Link
//       key={`model-detail-${fieldName}-${relVal.id}-link`}
//       to={`/Conveyor/${fieldNav}/${relVal.id}`}
//     >
//       {relVal.name}
//       {fieldRelValue.length - 1 > idx ? ', ' : ''}
//     </Link>
//   ))
// : fieldRelValue;
// return (
// <ListGroup.Item key={`model-detail-${fieldName}-list-group-item`}>
//   <Row>
//     <Col>{fieldName}:</Col>
//     <Col>{fieldValueDisplay}</Col>
//   </Row>
// </ListGroup.Item>
// );

export default ModelDetails;
