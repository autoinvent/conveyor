import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        'relative group border rounded-lg bg-[--bg-color] text-[--text-color] border-solid border-[--border-color] shadow-sm inline-block m-2 p-4 w-[300px] h-[300px] overflow-hidden justify-center transition-all duration-300 ease-in-out hover:h-[300px]}',
        className,
      )}
      {...props}
    />
  );
});

Card.displayName = 'Card';
