"use client";
 
import * as React from "react";
import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
 
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { TimePicker12Demo } from "./time-picker-12h";
 
export interface Props {
  value?: string
}

export function DateTimePicker({ value } : Props) {
  const [date, setDate] = React.useState<Date|undefined>( 
    value && !Number.isNaN(new Date(value)) 
    ? new Date(value)
    : undefined
  );
 
  /**
   * carry over the current time when a user clicks a new day
   * instead of resetting to 00:00
   */
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      setDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
  };
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP hh:mm:ss a") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
        />
        <div className='border-border border-t p-3'>
          <TimePicker12Demo setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}