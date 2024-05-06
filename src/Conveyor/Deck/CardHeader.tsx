import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={twMerge(
      'flex flex-col gap-1.5 items-center justify-center p-0 bg-transparent border-0 transform translate-y-[200px] max-h-16 group-hover:translate-y-0',
      className,
    )}
    ref={ref}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';
