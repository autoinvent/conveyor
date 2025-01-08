import React, { cloneElement, useState } from 'react';

import { LoaderCircle, Save, SquarePen, Trash2, X, Zap } from 'lucide-react';

import { useFormStore } from '@/Form';
import { Lens, useLensesStore } from '@/Lenses';
import { TableCell, type TableCellProps } from '@/Table';
import { Button } from '@/lib/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/lib/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { DataLens, type DataType } from '@/types';

import { ACTION_COLUMN } from './ModelTable';
import type { ContextOptions } from './ModelTableStoreContext';
import { useModelTableStore } from './useModelTableStore';

export interface ModelTableActionCellProps
  extends Omit<TableCellProps, 'columnId'> {}

export const ModelTableActionCell = ({
  children,
  className,
  ...tableCellProps
}: ModelTableActionCellProps) => {
  const setLens = useLensesStore((state) => state.setLens);
  const defaultValues = useFormStore((state) => state.formState.defaultValues);
  const isSubmitting = useFormStore((state) => state.formState.isSubmitting);
  const dirtyFields = useFormStore((state) => state.formState.dirtyFields);
  const reset = useFormStore((state) => state.reset);
  const handleSubmit = useFormStore((state) => state.handleSubmit);
  const onUpdate = useModelTableStore((state) => state.onUpdate);
  const onDelete = useModelTableStore((state) => state.onDelete);
  const contextOptions = useModelTableStore((state) => state.contextOptions);

  const onEditHandler = () => setLens(DataLens.INPUT);
  const onCancelEditHandler = () => {
    setLens(DataLens.DISPLAY);
    reset();
  };
  const onSaveHandler = handleSubmit(async (formData: DataType) => {
    const changedData = Object.fromEntries(
      Object.entries(formData).filter((entry) => dirtyFields[entry[0]]),
    );
    await onUpdate?.({
      data: { ...defaultValues },
      changedData,
      onEdit: onEditHandler,
      onCancelEdit: onCancelEditHandler,
    });
  });
  const onDeleteHandler = handleSubmit(async () => {
    await onDelete?.({
      data: { ...defaultValues },
      changedData: {},
      onEdit: onEditHandler,
      onCancelEdit: onCancelEditHandler,
    });
  });

  const [open, setOpen] = useState<boolean>(false);
  const generateItemsRecursively = (
    options: ContextOptions[],
  ) => {
    return options.map(({ label, icon, onClick, subOptions, separator }) => {
      const menuItem = (
        <React.Fragment key={label}>
          <div className="mr-2 flex h-4 w-4 items-center">{icon}</div>
          {label}
        </React.Fragment>
      );
      return subOptions ? (
        <DropdownMenuSub key={JSON.stringify(label)}>
          <DropdownMenuSubTrigger>{menuItem}</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="w-48">
              {generateItemsRecursively(subOptions)}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      ) : (
        <>
          <DropdownMenuItem key={JSON.stringify(label)} className='' onClick={onClick}>
            {menuItem}
          </DropdownMenuItem>
          { separator && <DropdownMenuSeparator key={`${JSON.stringify(label)}-separator`}/> }
        </>
      );

    });
  };

  return (
    <TableCell
      className={cn('sticky right-0 w-0 bg-inherit shadow-left', className)}
      columnId={ACTION_COLUMN}
      {...tableCellProps}
    >
      {children === undefined ? (
        <div className="space-x-1 whitespace-nowrap">
          <DropdownMenu onOpenChange={setOpen}>
            <DropdownMenuTrigger
              className={cn('rounded-md hover:bg-accent', open && 'bg-accent')}
            >
              <div className="flex h-8 w-8 items-center justify-center">
                <Zap className="h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {contextOptions?.length ? (
                generateItemsRecursively(contextOptions)
              ) : (
                <DropdownMenuItem disabled>No Options</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Lens lens={!isSubmitting && DataLens.DISPLAY}>
            {onUpdate && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onEditHandler}
                onKeyUp={(e) => e.key === 'Enter' && onEditHandler()}
              >
                <SquarePen className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost-destructive"
                size="icon"
                onClick={onDeleteHandler}
                onKeyUp={(e) => e.key === 'Enter' && onDeleteHandler()}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </Lens>
          <Lens lens={!isSubmitting && DataLens.INPUT}>
            {onUpdate && (
              <Button
                variant="ghost-success"
                size="icon"
                onClick={onSaveHandler}
                onKeyUp={(e) => e.key === 'Enter' && onSaveHandler()}
              >
                <Save className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancelEditHandler}
              onKeyUp={(e) => e.key === 'Enter' && onCancelEditHandler()}
            >
              <X className="h-4 w-4" />
            </Button>
          </Lens>
          {isSubmitting && (
            <Button variant="ghost" size="icon">
              <LoaderCircle className="h-4 w-4 animate-spin" />
            </Button>
          )}
        </div>
      ) : (
        children
      )}
    </TableCell>
  );
};
