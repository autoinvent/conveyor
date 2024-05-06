import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardField = React.forwardRef<
  HTMLPreElement,
  React.HTMLAttributes<HTMLPreElement>
>(({ className, ...props }, ref) => (
  <pre
    ref={ref}
    className={twMerge(
      'mb-2 font-normal block whitespace-pre-line w-[250px] flex-shrink-0',
      className,
    )}
    {...props}
  />
));
CardField.displayName = 'CardField';
