import { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import * as R from 'ramda';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { GraphQLFetcher, QueryFetcher } from '../commons/types';
import {
  Schema,
  getModelByPropName,
  getModels,
  getModelName,
  getModelFields,
  getFieldTitle,
  getFieldType,
  getGraphQLFieldName,
} from '../schema/schema';

function Model({ schema, fetcher }: { schema: Schema; fetcher: GraphQLFetcher }) {
  const { modelTitle } = useParams();
  let fetchModel: QueryFetcher = () => {};

  if (!modelTitle) {
    throw new Error('Model requires url parameter.');
  } else {
    const currentModel = getModelByPropName(schema, 'title_plural', modelTitle);
    const currentModelName = getModelName(currentModel);
    const currentModelFields = getModelFields(currentModel);

    // Creates a list of potential relational field types
    const models = getModels(schema);
    const relationalFieldTypes: string[] = [];
    R.forEach((model) => {
      R.append(getModelName(model), relationalFieldTypes);
      // TODO changge 's' to 'List'
      R.append(`${getModelName(model)}s`, relationalFieldTypes);
    }, models);
    // Creates a list of model fields that can be queried by graphQL
    const queryModelFields = R.map((field) => {
      const fieldTitle = getFieldTitle(field);
      const fieldType = getFieldType(field);
      if (fieldType === 'string') {
        return fieldTitle;
      }
      return getGraphQLFieldName(fieldTitle);
    }, currentModelFields);
    fetchModel = async () => {
      // TODO changge 's' to 'List'
      const query = gql`
        query {
          ${currentModelName}s {
            result {
              ${R.join(' ', queryModelFields)}
            }
          }
        }
      `;
      const param = {
        query,
        variables: {},
      };
      return fetcher(param).then(
        // TODO: s to List
        (response: any) => {
          const { result } = response[`${currentModelName}s`];
          const headers = R.map((field) => getFieldTitle(field), currentModelFields);
          return { result, headers };
        },
      );
    };
  }

  const {
    isLoading: loading,
    error: err,
    data: fetchedData,
  } = useQuery(['model', modelTitle], fetchModel);

  const [data, setData] = useState(() => []);

  useEffect(() => {
    setData(() => fetchedData?.result);
  }, [fetchedData]);

  const headers = fetchedData?.headers ?? [];
  const columnHelper = createColumnHelper<any>();
  const columns = R.map(
    (header) =>
      columnHelper.accessor(header, {
        cell: (info) => {
          const val = info.getValue();
          if (val?.name) {
            return val.name;
          }
          if (val?.[0] && typeof val !== 'string') {
            return R.map(
              (v) => (
                <a key={`${info.column.id}-${v.name}`} href="#s">
                  {v.name}
                </a>
              ),
              val,
            );
          }
          return val;
        },
      }),
    headers,
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container>
      <Row>
        <h2>{modelTitle}</h2>
      </Row>
      <Row>
        {data && (
          <Table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Row>
    </Container>
  );
}

export default Model;
