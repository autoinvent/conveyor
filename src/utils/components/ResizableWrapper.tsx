import { useEffect, type ReactNode, useState, useRef } from 'react';

export interface ResizableWrapperProps {
  resizable: boolean;
  width: number;
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
      setIsResizing(false);
      let newWidth = currentWidth + deltaX;
      setDeltaX(0);
      const scrollWidth = ref.current?.scrollWidth;
      if (scrollWidth && scrollWidth !== newWidth) {
        newWidth = ref.current?.scrollWidth;
      }
      setCurrentWidth(newWidth);
      onWidthChange?.(newWidth);
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
    if (!isResizing && ref.current) {
      console.log(currentWidth, ref.current.scrollWidth);
    }
  }, [isResizing, currentWidth]);

  return resizable ? (
    <div
      className="h-full"
      style={{ width: `${currentWidth + deltaX}px` }}
      ref={ref}
    >
      {children}
      <div
        className="absolute top-0 right-0 bottom-0 w-2 cursor-ew-resize select-none bg-blue-400"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsResizing(true);
          setClientX(e.clientX);
        }}
      >
        <span className="h-1/2 w-1/4 rounded bg-border" />
      </div>
    </div>
  ) : (
    children
  );
};
