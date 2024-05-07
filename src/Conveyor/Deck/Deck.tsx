import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const Deck = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge('flex-wrap', className)}
    style={{ ...style }}
    {...props}
  />
));
Deck.displayName = 'Deck';
