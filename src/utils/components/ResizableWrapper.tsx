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
  const [clientX, setClientX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [lastDeltaX, setlastDeltaX] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(width);
  const ref = useRef<HTMLDivElement>(null);
  let scrollParent = null
  if(ref.current){
    scrollParent = getScrollParent(ref.current);
  }
  useEffect(() => {
    
    const onMouseMove = (e: MouseEvent) => {
      setlastDeltaX(deltaX);
      setDeltaX(e.clientX - clientX);
      console.log("---------------------")
      console.log("Event: " + e.clientX);
      console.log("client: " + clientX);
      console.log("Delta: " + deltaX);
      console.log("lastDelta:" + lastDeltaX)
      console.log("current delta - last delta: " + (deltaX - lastDeltaX))
      if(scrollParent){
        //console.log(scrollParent.clientWidth);
        scrollParent.scroll({
          left: e.pageX,
          behavior: "smooth"
        })
      }
    };
    
    
    const onMouseUp = () => {
      let newWidth = currentWidth + deltaX;
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
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isResizing, currentWidth, clientX, deltaX, onWidthChange, scrollParent]);

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
      style={{ width: `${currentWidth + deltaX}px` }}
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
