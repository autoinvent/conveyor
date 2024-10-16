"use client";
 
import * as React from "react";
import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
 
import { cn } from "@/lib/utils";
import { Button } from "../lib/components/ui/button";
import { Calendar } from "../lib/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../lib/components/ui/popover";
import { type Granularity, TimePicker12Demo } from "../lib/components/ui/time-picker-12h";

type DatetimeInputRef = {
  value?: string;
} & Omit<HTMLButtonElement, 'value'>;

export interface DatetimeInputProps {
  value?: string;
  onChange?: (date: string | undefined) => void;
  granularity?: Granularity;
}

export const DatetimeInput = React.forwardRef<Partial<DatetimeInputRef>, DatetimeInputProps>(
  (
    {
      value,
      onChange,
      granularity = "Second",
      ...props
    },
    ref
  ) => {
    const [date, setDate] = React.useState<Date|undefined>( 
      value && !Number.isNaN(new Date(value)) 
      ? new Date(value)
      : undefined
    );
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        ...buttonRef.current,
        value,
      }),
      [value],
    );
   
    /**
     * carry over the current time when a user clicks a new day
     * instead of resetting to 00:00
     */
    const handleSelect = (newDay: Date | undefined) => {
      if (!newDay) {
        setDate(undefined); 
        onChange?.(undefined);
        return;
      }
      if (!date) {
        setDate(newDay);
        onChange?.(String(newDay))
        return;
      }
      const diff = newDay.getTime() - date.getTime();
      const diffInDays = diff / (1000 * 60 * 60 * 24);
      const newDateFull = add(date, { days: Math.ceil(diffInDays) });
      setDate(newDateFull);
      onChange?.(String(newDay))
    };

    const formatRecord : Record<Granularity,string> = {
      Day: "PPP",
      Hour: "PPP hh a",
      Minute: "PPP hh:mm a",
      Second: "PPP hh:mm:ss a",
    }
   
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            ref={buttonRef}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, formatRecord[granularity]) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => handleSelect(d)}
            initialFocus
            {...props}
          />
          <div className='border-border border-t p-3'>
            <TimePicker12Demo setDate={setDate} date={date} granularity={granularity}/>
            <div className='flex w-full flex-row pt-3'>
              <Button onClick={() => { 
                const newDate = new Date();
                setDate(newDate); 
                onChange?.(String(newDate))
              }}>
                Today
              </Button>
              <div className="flex-1"/>
              <Button onClick={() => handleSelect(undefined)}>
                Clear
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
)