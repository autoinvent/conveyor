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
  const xPadding = 32;

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
      if (parentWidth) setCurrentWidth(parentWidth - xPadding);
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

    // width of div in header should be w-full if table cells cannot be made any smaller
    setTimeout(() => {
      const parentWidth =
        ref.current?.parentElement?.getBoundingClientRect().width;
      if (parentWidth) setCurrentWidth(parentWidth - xPadding);
    }, 10);
  }, []);

  let columnWidth = currentWidth && currentWidth + deltaX;
  const childWidth =
    ref.current?.firstElementChild?.getBoundingClientRect().width;

  // width cannot be smaller than the clickable text
  columnWidth = Math.max(columnWidth || 0, childWidth || 0);

  // header div width should match table header width
  const [first, setFirst] = useState<boolean>(true);
  useEffect(() => {
    if (first && currentWidth && !width) {
      setFirst(false);
      const parentWidth =
        ref.current?.parentElement?.getBoundingClientRect().width;
      if (parentWidth && currentWidth && parentWidth > currentWidth) {
        setCurrentWidth(parentWidth - xPadding);
      }
    }
  }, [first, currentWidth, width]);

  return resizable ? (
    <div
      className="h-full"
      style={columnWidth ? { width: `${columnWidth}px` } : {}}
      ref={ref}
    >
      {children}
      <div
        className="-right-1 absolute inset-y-0 w-2 cursor-ew-resize select-none"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsResizing(true);
          setClientX(e.clientX);
          const allElements = document.querySelectorAll('*');
          for (const element of allElements) {
            element.classList.add('resizing');
          }
        }}
      >
        <div className="absolute inset-x-1/3 inset-y-1/4 rounded bg-border" />
      </div>
    </div>
  ) : (
    children
  );
};
