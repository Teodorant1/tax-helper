"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";

interface DateRangePickerProps {
  className?: string;
  onChange?: (date: DateRange | undefined) => void;
}

export function DateRangePicker({ className, onChange }: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
    if (selectedDate?.from && selectedDate?.to) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Button
        id="date"
        variant="outline"
        size="sm"
        className={cn(
          "justify-start text-left font-normal",
          !date && "text-muted-foreground",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
            </>
          ) : (
            format(date.from, "LLL dd, y")
          )
        ) : (
          <span>Select Period</span>
        )}
      </Button>
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 rounded-md border bg-popover p-0 shadow-md">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </div>
      )}
    </div>
  );
}
