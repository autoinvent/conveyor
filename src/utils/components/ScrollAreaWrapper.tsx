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
  
  // Extracted scrollWidth and lastElementChild in order to allow them to be used
  // as dependencies in the below useEffect
  const lastElementChild = ref.current?.lastElementChild;
  const scrollWidth = ref.current?.lastElementChild?.scrollWidth;

  const [isOverflow, setIsOverflow] = useState(false);
  useEffect(() => {
    if (!lastElementChild) return;
    if (!scrollWidth) return;

    const observer = new ResizeObserver(() => {
      if (
        scrollWidth > lastElementChild.clientWidth &&
        !isOverflow 
      ) {
        setIsOverflow(true); 
      } else if (
        scrollWidth <= lastElementChild.clientWidth &&
        isOverflow
      ) {
        setIsOverflow(false);
      }
    });
    observer.observe(lastElementChild);
    return () => {
      observer.disconnect();
    };
  }, [isOverflow, lastElementChild, scrollWidth]);

  return scrollable ? (
    <ScrollArea className={cn(isOverflow && 'pb-2', className)} ref={ref}>
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ) : (
    children
  );
};
