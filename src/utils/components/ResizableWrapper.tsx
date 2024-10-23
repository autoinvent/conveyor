import { type ReactNode, useEffect, useRef, useState } from 'react';

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
  const [exitedScrollParent, setExitedScrollParent] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(width);
  const ref = useRef<HTMLDivElement>(null);
  let scrollParent = null;
  if (ref.current) {
    scrollParent = getScrollParent(ref.current);
  }
  useEffect(() => {
    const onScrollEnter = (e: MouseEvent) => {
      setExitedScrollParent(false);
    };
    const onScrollLeave = (e: MouseEvent) => {
      setExitedScrollParent(true);
    };
    const onMouseMove = (e: MouseEvent) => {
      setDeltaX(e.clientX - clientX);
    };
    const onMouseUp = () => {
      let newWidth = currentWidth + deltaX;
      if (scrollParent && exitedScrollParent && deltaX > 0) {
        scrollParent.scrollBy({
          left: newWidth > 0 ? deltaX : 0,
          behavior: 'smooth',
        });
        setExitedScrollParent(false);
      }
      const scrollWidth = ref.current?.scrollWidth;
      if (scrollWidth && scrollWidth !== newWidth) {
        newWidth = ref.current?.scrollWidth;
      }
      setIsResizing(false);
      setCurrentWidth(newWidth);
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
      scrollParent?.addEventListener('mouseenter', onScrollEnter);
      scrollParent?.addEventListener('mouseleave', onScrollLeave);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      scrollParent?.removeEventListener('mouseenter', onScrollEnter);
      scrollParent?.removeEventListener('mouseleave', onScrollLeave);
    };
  }, [
    isResizing,
    currentWidth,
    clientX,
    deltaX,
    onWidthChange,
    scrollParent,
    exitedScrollParent,
  ]);

  function getScrollParent(node: HTMLDivElement) {
    const isElement = node instanceof HTMLDivElement;
    const overflowX = isElement && window.getComputedStyle(node).overflowX;
    const isScrollable = overflowX === 'scroll';

    if (node.parentElement == null) {
      return null;
    }
    if (isScrollable && node.scrollHeight > node.clientHeight) {
      return node;
    }
    return getScrollParent(node.parentElement as HTMLDivElement);
  }

  return resizable ? (
    <div
      className="h-full"
      style={{
        // Width can't be less than the horizontal space taken up by the title of each column
        width: `${
          currentWidth + deltaX >
          (ref.current?.firstElementChild?.getBoundingClientRect().width ?? 0)
            ? currentWidth + deltaX
            : ref.current?.firstElementChild?.getBoundingClientRect().width ??
              200
        }px`,
      }}
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