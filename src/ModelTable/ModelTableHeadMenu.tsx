import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
  forwardRef,
  useState,
} from 'react';

import { ArrowDown, ArrowUp, EyeOff } from 'lucide-react';

import { Slot } from '@radix-ui/react-slot';

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
  const fieldOrder = useModelTableStore((state) => state.fieldOrder);
  const onFieldOrderChange = useModelTableStore(
    (state) => state.onFieldOrderChange,
  );
  const sortOrder = useModelTableStore(
    (state) => state.tableOptions?.sortOrder,
  );
  const onSortOrderChange = useModelTableStore(
    (state) => state.tableOptions?.onSortOrderChange,
  );
  const sortable = useModelTableStore(
    (state) => state.columnOptions?.[field]?.sortable ?? true,
  );
  const hidable = useModelTableStore(
    (state) => state.columnOptions?.[field]?.hidable ?? true,
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
          <div className="inline-block">
            <Button
              variant="ghost"
              size="sm"
              className="mx-4 my-2 h-8 data-[state=open]:bg-accent"
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              {children}
              <Lenses activeLens={sortable && currentSortDirection}>
                <Lens lens={SortDirection.ASC}>
                  <ArrowUp className="ml-2 h-4 w-4" />
                </Lens>
                <Lens lens={SortDirection.DESC}>
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Lens>
              </Lenses>
            </Button>
          </div>
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
                <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={SortDirection.DESC}>
                <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
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
              <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
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
  ElementRef<typeof DropdownMenuTrigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuTrigger>
>(({ onPointerDown, ...props }, ref) => {
  return (
    <Slot {...props} ref={ref}>
      {props.children}
    </Slot>
  );
});
