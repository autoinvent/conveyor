import { type ReactNode, useEffect, useState } from 'react';

export interface ResizableWrapperProps {
  children: ReactNode;
  cellRef: React.RefObject<HTMLTableCellElement>;
  width: number | undefined;
  setWidth: (width: number) => void;
  resizable: boolean;
}

export const ResizableWrapper = ({
  children,
  cellRef,
  width,
  setWidth,
  resizable,
}: ResizableWrapperProps) => {
  const [startX, setStartX] = useState<number>();
  const [startWidth, setStartWidth] = useState<number>();

  useEffect(() => {
    if (startX && startWidth) {
      document.addEventListener('mousemove', doResize);
      document.addEventListener('mouseup', stopResize);
    }
  }, [startX, startWidth]);

  useEffect(() => {
    if (cellRef.current) {
      setWidth(cellRef.current?.offsetWidth);
    }
  }, [cellRef.current, setWidth]);

  const startResizing = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setStartX(e.clientX);
    setStartWidth(width);
  };

  const doResize = (e: MouseEvent) => {
    if (startWidth && startX) {
      setWidth(startWidth + (e.clientX - startX));
    }
  };

  const stopResize = () => {
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
  };

  return (
    <div className="flex h-full flex-row">
      {children}
      <div className="flex-grow" />
      {resizable ? (
        <div
          className="flex h-full w-2 cursor-ew-resize select-none items-center justify-center"
          onMouseDown={(e) => {
            startResizing(e);
            e.stopPropagation();
          }}
        >
          <div className="h-1/2 w-1/4 rounded bg-border" />
        </div>
      ) : null}
    </div>
  );
};
