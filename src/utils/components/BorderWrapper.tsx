import type { ReactNode } from 'react';

export interface BorderWrapperProps {
  bordered: boolean;
  children?: ReactNode;
}
export const BorderWrapper = ({ bordered, children }: BorderWrapperProps) => {
  return bordered ? (
    <div className="rounded-md border">{children}</div>
  ) : (
    children
  );
};
