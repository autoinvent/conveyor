import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export const CircleCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Event handlers for mouse enter and leave
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={ref}
      className={twMerge(
        'relative group border rounded-lg bg-[--bg-color] text-[--text-color] border-solid border-[--border-color] shadow-sm inline-block m-2 p-4 w-[300px] h-[300px] overflow-hidden justify-center transition-all duration-300 ease-in-out hover:h-[300px]}',
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="absolute overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[70%] w-[175px] h-[175px] bg-[--border-color] rounded-[100px] transition-all duration-300 flex items-center justify-center group-hover:w-full group-hover:h-full group-hover:rounded-lg group-hover:-translate-x-1/2 group-hover:-translate-y-1/2">
        {/* Render the content always */}
        <div className="opacity-100 scale-[60%] transition-all duration-300 ease-in-out p-[10px] box-border group-hover:scale-100">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              if (!isHovered) {
                if (
                  child.type &&
                  (child.type as any).displayName !== 'CardHeader' &&
                  (child.type as any).displayName !== 'CardTitle'
                ) {
                  return React.cloneElement(child);
                }
              } else if (child.type) {
                return React.cloneElement(child);
              }
            }
            return null;
          })}
        </div>
      </div>
      {/* Render title and description below circle */}
      {!isHovered &&
        React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            ((child.type as any).displayName === 'CardHeader' ||
              (child.type as any).displayName === 'CardTitle')
          ) {
            return React.cloneElement(child);
          }
          return null;
        })}
    </div>
  );
});

CircleCard.displayName = 'CircleCard';
