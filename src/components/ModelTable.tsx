import { useMemo } from 'react';
import { Table } from 'react-bootstrap';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { ModelTableProps } from '../common/types';
import { useConveyorStore } from '../store';

function ModelTable({
  currentModelName,
  fields: headers,
  data: tableData,
}: ModelTableProps) {
  const { navigate } = useConveyorStore();

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<Record<string, any>>();
    return headers.map((header) => {
      const { name, rel } = header;
      if (name === 'name') {
        return columnHelper.accessor(name, {
          cell: (info) => {
            const { id } = info.row.original;
            return [
              <button
                key={`${info.column.id}-${id}`}
                type='button'
                onClick={() => navigate(currentModelName, id)}
              >
                {info.getValue()}
              </button>,
            ];
          },
        });
      }
      return columnHelper.accessor(name, {
        cell: (info) => {
          const val = info.getValue();
          const relVals = Array.isArray(val) ? val : [val];
          if (!rel) {
            return val;
          }
          if (!val) {
            return val;
          }
          return relVals.map((relVal, idx) => (
            <button
              key={`${info.column.id}-${relVal.id}`}
              type='button'
              onClick={() => navigate(rel, relVal.id)}
            >
              {relVal.name}
              {relVals.length - 1 > idx ? ', ' : ''}
            </button>
          ));
        },
      });
    });
  }, [currentModelName, headers, navigate]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table responsive>
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
  );
}

export default ModelTable;
