import { type ReactNode, useEffect, useRef, useState } from 'react';

import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface ScrollAreaWrapperProps {
  scrollable: boolean;
  children?: ReactNode;
}
export const ScrollAreaWrapper = ({
  scrollable,
  children,
}: ScrollAreaWrapperProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [isOverflow, setIsOverflow] = useState(false);
  useEffect(() => {
    const { current } = ref;
    const lastChild = current?.lastElementChild;
    if (current && lastChild) {
      new ResizeObserver(() => {
        if (lastChild?.scrollWidth > current.clientWidth && !isOverflow) {
          setIsOverflow(true);
        } else if (
          lastChild?.scrollWidth <= current.clientWidth &&
          isOverflow
        ) {
          setIsOverflow(false);
        }
      }).observe(current);
    }
  }, [isOverflow]);

  return scrollable ? (
    <ScrollArea className={cn(isOverflow && 'pb-2')} ref={ref}>
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ) : (
    children
  );
};
