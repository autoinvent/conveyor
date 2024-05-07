import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      'flex items-center p-1.5 text-xs text-stone-400 flex-shrink-0 mb-0.5 min-h-0',
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
