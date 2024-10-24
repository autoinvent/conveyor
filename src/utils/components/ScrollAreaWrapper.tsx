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

  const [isOverflow, setIsOverflow] = useState(false);

  let lastElementChild = ref.current?.lastElementChild;
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
    lastElementChild = ref.current?.lastElementChild;
    if (!lastElementChild) return;
    observer.observe(lastElementChild);
    
    return () => {
      observer.disconnect();
    };
  }, [observer, lastElementChild]);

  return scrollable ? (
    <ScrollArea className={cn(isOverflow && 'pb-5', className)} ref={ref}>
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ) : (
    children
  );
};
