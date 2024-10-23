import {
  type ElementRef,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface ScrollAreaWrapperProps {
  scrollable: boolean;
  fieldOrder: string[];
  className?: string;
  children?: ReactNode;
}

export const ScrollAreaWrapper = ({
  scrollable,
  fieldOrder,
  className,
  children,
}: ScrollAreaWrapperProps) => {
  const ref = useRef<ElementRef<typeof ScrollArea> | null>(null);

  const [isOverflow, setIsOverflow] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: fieldOrder dependency is required to keep accurate table size reading when columns disappear
  useLayoutEffect(() => {
    const lastElementChild = ref.current?.lastElementChild;
    if (!lastElementChild) return;

    const observer = new ResizeObserver(() => {
      const scrollWidth = lastElementChild.scrollWidth;
      const clientWidth = lastElementChild.clientWidth;
      if (scrollWidth > clientWidth && !isOverflow) {
        setIsOverflow(true);
      } else if (scrollWidth <= clientWidth && isOverflow) {
        setIsOverflow(false);
      }
    });
    observer.observe(lastElementChild);

    return () => {
      observer.disconnect();
    };
  }, [isOverflow, fieldOrder]);

  return scrollable ? (
    <ScrollArea className={cn(isOverflow && 'pb-5', className)} ref={ref}>
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ) : (
    children
  );
};
