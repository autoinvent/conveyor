import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    className={twMerge(
      'text-2xl font-semibold tracking-tighter overflow-hidden break-all min-h-8 max-h-16 group-hover:block',
    )}
    ref={ref}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';
