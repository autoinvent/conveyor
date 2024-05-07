import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={twMerge(
      'px-6 overflow-hidden w-[300px] whitespace-normal flex flex-wrap transition-all duration-300 ease-in-out max-h-[200px] items-center relative group-hover:h-[200px]',
      className,
    )}
    ref={ref}
    {...props}
  />
));
CardContent.displayName = 'CardContent';
