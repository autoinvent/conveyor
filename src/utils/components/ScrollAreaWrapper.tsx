import type { ReactNode } from 'react';

import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';

export interface ScrollAreaWrapperProps {
  scrollable: boolean;
  children?: ReactNode;
}
export const ScrollAreaWrapper = ({
  scrollable,
  children,
}: ScrollAreaWrapperProps) => {
  return scrollable ? (
    <ScrollArea>
      {children}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ) : (
    children
  );
};
