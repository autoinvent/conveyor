import * as SwitchPrimitive from '@radix-ui/react-switch';
import type React from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  labelLeft?: string;
  labelRight?: string;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, labelLeft = '', labelRight = '', ...props }, ref) => { 
    
    console.log(props.checked);
    
    return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-[25px] w-[60px] rounded-full shadow-md shadow-slate-500 focus:outline-none focus:drop-shadow-sm', props.checked ? 'bg-red-700' : 'bg-green-500',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'block h-[21px] w-[21px] rounded-full bg-white shadow-md focus:outline-none'
        )}
        style={{ transition: "100ms", transform: props.checked ? "translateX(36px)" : "translateX(2px)", willChange: "transform"}}
        />
      <div className={cn('pointer-events-none absolute inset-0 flex items-center px-1 text-white', props.checked ? "justify-start" : "justify-end")}>
        {props.checked ? (
          <span className='text-xs'>{labelRight}</span>
        ) : (
          <span className='text-xs'>{labelLeft}</span>
        )}
      </div>
    </SwitchPrimitive.Root>
  )}
);

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };