import { type ReactNode, useEffect, useRef, useState } from 'react';

export interface ResizableWrapperProps {
  resizable: boolean;
  width?: number;
  onWidthChange?: (width: number) => void;
  children: ReactNode;
}

export const ResizableWrapper = ({
  resizable,
  width,
  onWidthChange,
  children,
}: ResizableWrapperProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(width);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setDeltaX(e.clientX - clientX);
    };
    const onMouseUp = () => {
      if (!currentWidth) return;

      let newWidth = currentWidth + deltaX;
      const scrollWidth = ref.current?.scrollWidth;
      if (scrollWidth && scrollWidth !== newWidth) {
        newWidth = ref.current?.scrollWidth;
      }
      setIsResizing(false);
      // div should snap to full width of header cell if cells are wider
      const parentWidth =
        ref.current?.parentElement?.getBoundingClientRect().width;
      if (parentWidth) setCurrentWidth(parentWidth);

      setDeltaX(0);
      onWidthChange?.(newWidth);
      const allElements = document.querySelectorAll('*');
      for (const element of allElements) {
        element.classList.remove('resizing');
      }
    };
    if (isResizing) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isResizing, currentWidth, clientX, deltaX, onWidthChange]);

  useEffect(() => {
    if (ref.current) {
      setCurrentWidth(ref.current.scrollWidth);
    }
  }, []);

  const columnWidth = currentWidth && currentWidth + deltaX;

  return resizable ? (
    <div
      className='relative h-full select-none bg-purple-200'
      style={columnWidth ? { width: `${columnWidth}px` } : {}}
      ref={ref}
    >
      {children}
      <div
        className='absolute inset-y-0 top-0 right-0 w-2 cursor-ew-resize select-none'
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsResizing(true);
          // width of div in header should be w-full if table cells cannot be made any smaller
          // const parentWidth =
          //   ref.current?.parentElement?.getBoundingClientRect().width;
          // if (parentWidth) setCurrentWidth(parentWidth);
          setClientX(e.clientX);
          const allElements = document.querySelectorAll('*');
          for (const element of allElements) {
            element.classList.add('resizing');
          }
        }}
      >
        <div className="absolute inset-x-1/3 inset-y-1/4 rounded bg-green-200" />
      </div>
    </div>
  ) : (
    children
  );
};
