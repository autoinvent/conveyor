import { useEffect, useState, type ReactNode } from "react"

export interface ResizeWrapperProps {
  children: ReactNode
  cellRef: React.RefObject<HTMLTableCellElement>
  width: number
  setWidth: (width : number) => void
  resizable: boolean
}

export const ResizeWrapper = ({ children, cellRef, width, setWidth, resizable } : ResizeWrapperProps) => {
  const [startX, setStartX] = useState<number>();
  const [startWidth, setStartWidth] = useState<number>();
  const [finishedResize, setFinishedResize] = useState<boolean>(false);

  if (!width && cellRef.current) {
    setWidth(cellRef.current.offsetWidth)
  }

  useEffect( () => {
    if (startX && startWidth) {
      document.addEventListener("mousemove", doResize);
      document.addEventListener("mouseup", stopResize);
    }
  }, [startX, startWidth])

  useEffect( () => {
    if (finishedResize && cellRef?.current && width) {
      setFinishedResize(false);
      setWidth(Math.max(cellRef.current?.offsetWidth, width))
    }
  }, [finishedResize, cellRef, width, setWidth])

  const startResizing = (
    e : React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log(cellRef,width,setWidth)
    setStartX(e.clientX);
    setStartWidth(width);
  }

  const doResize = (e : MouseEvent) => {
    if (startWidth && startX) {
      console.log(startWidth + (e.clientX - startX))
      setWidth(startWidth + (e.clientX - startX))
    }
  }

  const stopResize = () => {
    document.removeEventListener("mousemove",doResize);
    document.removeEventListener("mouseup",stopResize);
    setFinishedResize(true);
  }

  return (
    <div className='flex h-full flex-row'>
      {children}
      <div className="flex-grow"/>
      {
        resizable ? 
          <div className='z-50 h-full w-1 cursor-ew-resize select-none rounded bg-border' onMouseDown={(e) => {
            startResizing(e)
            e.stopPropagation()
          }}/> :
          null
      }
    </div>
  )
}
