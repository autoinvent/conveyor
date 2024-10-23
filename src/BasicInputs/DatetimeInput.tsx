'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { add, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '../lib/components/ui/button';
import { Calendar } from '../lib/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../lib/components/ui/popover';
import {
  type Granularity,
  TimePicker12h,
  TimePicker24h,
} from '../lib/components/ui/time-picker';

type DatetimeInputRef = {
  value?: string;
} & Omit<HTMLButtonElement, 'value'>;

export interface DatetimeInputProps {
  value?: string;
  onChange?: (date: string | undefined) => void;
  granularity?: Granularity;
  hourCycle?: 12 | 24;
}

export const DatetimeInput = forwardRef<
  Partial<DatetimeInputRef>,
  DatetimeInputProps
>(
  (
    { value, onChange, granularity = 'Second', hourCycle = 12, ...props },
    ref,
  ) => {
    const [date, setDate] = useState<Date | undefined>(
      value && !Number.isNaN(new Date(value).valueOf())
        ? new Date(value)
        : undefined,
    );
    useEffect(() => {
      onChange?.(date ? date.toISOString() : undefined);
    }, [date, onChange]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(
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
      if (!newDay || !date) return setDate(newDay);

      const diff = newDay.getTime() - date.getTime();
      const diffInDays = diff / (1000 * 60 * 60 * 24);
      const newDateFull = add(date, { days: Math.ceil(diffInDays) });
      setDate(newDateFull);
    };

    const getFormatStyle = () => {
      switch (granularity) {
        case 'Day':
          return 'PPP';
        case 'Hour':
          return hourCycle === 12 ? 'PPP ha' : 'PPP HH:00';
        case 'Minute':
          return hourCycle === 12 ? 'PPP h:mm a' : 'PPP HH:mm';
        case 'Second':
          return hourCycle === 12 ? 'PPP h:mm:ss a' : 'PPP HH:mm:ss';
      }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              !date && 'text-muted-foreground',
              'min-w-[280px] justify-start text-left font-normal dark:[color-scheme:dark]',
            )}
            ref={buttonRef}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, getFormatStyle()) : <span>Pick a date</span>}
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
          <div className="border-border border-t p-3">
            {hourCycle === 12 && granularity !== 'Day' ? (
              <TimePicker12h
                setDate={setDate}
                date={date}
                granularity={granularity}
              />
            ) : hourCycle === 24 && granularity !== 'Day' ? (
              <TimePicker24h
                setDate={setDate}
                date={date}
                granularity={granularity}
              />
            ) : null}

            <div className="flex w-full flex-row pt-3">
              <Button
                variant="link"
                onClick={() => setDate(undefined)}
                className="p-2"
              >
                Clear
              </Button>
              <div className="flex-1" />
              <Button
                variant="link"
                onClick={() => setDate(new Date())}
                className="p-2"
              >
                Today
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);
