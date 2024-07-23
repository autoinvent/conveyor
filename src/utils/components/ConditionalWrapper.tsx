import type { ReactNode } from 'react';

export interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (base: ReactNode) => ReactNode;
  children: ReactNode;
}

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => {
  return condition ? wrapper(children) : children;
};
