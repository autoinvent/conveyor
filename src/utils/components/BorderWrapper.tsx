import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export interface BorderWrapperProps {
  bordered: boolean;
  className?: string;
  children?: ReactNode;
}
export const BorderWrapper = ({
  bordered,
  className,
  children,
}: BorderWrapperProps) => {
  return bordered ? (
    <div className={cn('rounded-md border', className)}>{children}</div>
  ) : (
    children
  );
};
