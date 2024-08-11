import type { ReactNode } from 'react';

export interface BorderWrapperProps {
  bordered: boolean;
  children?: ReactNode;
}
export const BorderWrapper = ({ bordered, children }: BorderWrapperProps) => {
  return bordered ? (
    <div className="min-w-80 rounded-md border">{children}</div>
  ) : (
    children
  );
};
