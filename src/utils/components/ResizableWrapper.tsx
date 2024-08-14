import {
  type ElementRef,
  forwardRef,
  useEffect,
  useRef,
  type ReactNode,
  useState,
} from 'react';

export interface ResizableWrapperProps {
  resizable: boolean;
  initalWidth: number;
  onWidthChange?: (width: number) => void;
  children: ReactNode;
}

export const ResizableWrapper = ({
  resizable,
  initalWidth,
  onWidthChange,
  children,
}: ResizableWrapperProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [width, setWidth] = useState(initalWidth);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setWidth(initalWidth + e.clientX - clientX);
    };
    const onMouseUp = () => {
      setIsResizing(false);
    };
    if (isResizing) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      onWidthChange?.(width);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isResizing, initalWidth, onWidthChange, clientX, width]);

  useEffect(() => {});

  return resizable ? (
    <div className="h-full" style={{ width: `${width}px` }}>
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
