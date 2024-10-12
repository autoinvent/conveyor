import {
  type ElementRef,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface ScrollAreaWrapperProps {
  scrollable: boolean;
  className?: string;
  children?: ReactNode;
}
export const ScrollAreaWrapper = ({
  scrollable,
  className,
  children,
}: ScrollAreaWrapperProps) => {
  const ref = useRef<ElementRef<typeof ScrollArea> | null>(null);

  const lastElementChild = ref.current?.lastElementChild;
  const scrollWidth = lastElementChild?.scrollWidth;
  const clientWidth = lastElementChild?.clientWidth;

  const [isOverflow, setIsOverflow] = useState(false);
  useEffect(() => {
    if (!lastElementChild || !scrollWidth || !clientWidth) return;

    const observer = new ResizeObserver(() => {
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
  }, [isOverflow, lastElementChild, scrollWidth, clientWidth]);

  return scrollable ? (
    <ScrollArea className={cn(isOverflow && 'pb-2', className)} ref={ref}>
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ) : (
    children
  );
};
