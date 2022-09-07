import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { GraphqlFetchResult } from '../commons/types';
import { toModelListName } from '../schema';

function ModelTable({
  currentModelName,
  fields: headers,
  data: tableData,
}: GraphqlFetchResult) {
  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Record<string, any>>();
    return headers.map((header) => {
      const { name, rel } = header;
      if (name === 'name') {
        return columnHelper.accessor(name, {
          cell: (info) => {
            const { id } = info.row.original;
            return [
              <Link
                key={`${info.column.id}-${id}`}
                to={`/Conveyor/${currentModelName}/${id}`}
              >
                {info.getValue()}
              </Link>,
            ];
          },
        });
      }
      return columnHelper.accessor(name, {
        cell: (info) => {
          const val = info.getValue();
          const relVals = !Array.isArray(val) ? [val] : val;
          if (!rel) return val;
          if (!val) return val;
          return relVals.map((relVal, idx) => (
            <Link
              key={`${info.column.id}-${relVal.id}`}
              to={`/Conveyor/${rel}/${relVal.id}`}
            >
              {relVal.name}
              {relVals.length - 1 > idx ? ', ' : ''}
            </Link>
          ));
        },
      });
    });
  }, [currentModelName, headers]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h3>{toModelListName(currentModelName)}</h3>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
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
    </>
  );
}

export default ModelTable;
