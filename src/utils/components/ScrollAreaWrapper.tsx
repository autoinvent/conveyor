import {
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface ScrollAreaWrapperProps {
  scrollable: boolean;
  className?: string;
  children?: ReactNode;
  scrollAreaRef: MutableRefObject<HTMLDivElement | null>;
}


export const ScrollAreaWrapper = ({
  scrollable,
  className,
  children,
  scrollAreaRef,
}: ScrollAreaWrapperProps) => {
  const [isOverflow, setIsOverflow] = useState(false);

  const lastElementChild = scrollAreaRef.current?.lastElementChild;
  const observer = new ResizeObserver(() => {
    const scrollWidth = lastElementChild?.scrollWidth;
    const clientWidth = lastElementChild?.clientWidth;
    if (scrollWidth && clientWidth) {
      if (scrollWidth > clientWidth && !isOverflow) {
        setIsOverflow(true);
      } else if (scrollWidth <= clientWidth && isOverflow) {
        setIsOverflow(false);
      }
    }
  });
  useEffect(() => {
    if (lastElementChild) {
      observer.observe(lastElementChild);
    }
    return () => {
      observer.disconnect();
    };
  }, [observer, lastElementChild]);

  return scrollable ? (
    <ScrollArea
      className={cn(isOverflow && 'pb-2', className)}
      ref={scrollAreaRef}
    >
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ) : (
    children
  );
};
