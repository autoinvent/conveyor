import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={twMerge(
      'text-xs text-stone-400 flex-shrink-0 mb-2 min-h-0 group-hover:translate-y-[215px] group-hover:items-center',
      className,
    )}
    ref={ref}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';
