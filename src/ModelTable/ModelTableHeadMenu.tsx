import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from '@radix-ui/react-icons';
import { Slot } from '@radix-ui/react-slot';
import { type ReactNode, forwardRef, useState } from 'react';

import { Lens, Lenses } from '@/Lenses';
import { Button } from '@/lib/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/components/ui/dropdown-menu';
import {
  SortDirection,
  getFieldSortDirection,
  setFieldSort,
  toggleFieldVisibility,
} from '@/utils';

import { useModelTableStore } from './useModelTableStore';

export interface ModelTableHeadMenuProps {
  field: string;
  children?: ReactNode;
}

export const ModelTableHeadMenu = ({
  field,
  children,
}: ModelTableHeadMenuProps) => {
  const sortable = useModelTableStore(
    (state) => state.tableOptions.columnOptions?.[field]?.sortable ?? true,
  );
  const hidable = useModelTableStore(
    (state) => state.tableOptions.columnOptions?.[field]?.hidable ?? true,
  );
  const sortOrder = useModelTableStore((state) => state.tableOptions.sortOrder);
  const fieldOrder = useModelTableStore(
    (state) => state.tableOptions.fieldOrder,
  );
  const onSortOrderChange = useModelTableStore(
    (state) => state.tableOptions.onSortOrderChange,
  );
  const onFieldOrderChange = useModelTableStore(
    (state) => state.tableOptions.onFieldOrderChange,
  );
  const currentSortDirection = getFieldSortDirection({ sortOrder, field });
  const onFieldSortChange = (newSortDir: string) => {
    let newSortDirection = newSortDir as SortDirection;
    if (newSortDirection === currentSortDirection) {
      newSortDirection = SortDirection.NONE;
    }
    const newSortOrder = setFieldSort({ sortOrder, field, newSortDirection });
    onSortOrderChange?.(newSortOrder);
  };
  const hideField = () => {
    const newFieldOrder = toggleFieldVisibility({
      fieldOrder,
      field,
    });
    onFieldOrderChange?.(newFieldOrder);
  };
  const [openMenu, setOpenMenu] = useState(false);

  return sortable || hidable ? (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger
        onPointerDown={(e) => {
          e.preventDefault();
        }}
        asChild
      >
        <DropdownMenuTriggerWithoutListener>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            {children}
            <Lenses activeLens={sortable && currentSortDirection}>
              <Lens lens={SortDirection.ASC}>
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              </Lens>
              <Lens lens={SortDirection.DESC}>
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              </Lens>
              <Lens lens={SortDirection.NONE}>
                <CaretSortIcon className="ml-2 h-4 w-4" />
              </Lens>
            </Lenses>
          </Button>
        </DropdownMenuTriggerWithoutListener>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <Lenses activeLens={sortable}>
          <Lens lens={true}>
            <DropdownMenuRadioGroup
              value={currentSortDirection}
              onValueChange={onFieldSortChange}
            >
              <DropdownMenuRadioItem value={SortDirection.ASC}>
                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={SortDirection.DESC}>
                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </Lens>
        </Lenses>
        <Lenses activeLens={sortable && hidable}>
          <Lens lens={true}>
            <DropdownMenuSeparator />
          </Lens>
        </Lenses>
        <Lenses activeLens={hidable}>
          <Lens lens={true}>
            <DropdownMenuItem onSelect={hideField}>
              <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          </Lens>
        </Lenses>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    children
  );
};

const DropdownMenuTriggerWithoutListener = forwardRef<
  React.ElementRef<typeof DropdownMenuTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger>
>(({ onPointerDown, ...props }, ref) => {
  return (
    <Slot {...props} ref={ref}>
      {props.children}
    </Slot>
  );
});
