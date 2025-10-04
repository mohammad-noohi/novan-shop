import { useState } from "react";
import { ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function DatePicker({ labelText, selected, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 ">
      <Label htmlFor="date" className="px-1 shrink-0">
        {labelText}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="dark:bg-transparent" asChild>
          <Button variant="outline" id="date" className="w-full dark:hover:bg-app-dark justify-between font-normal">
            {selected ? selected.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4 rounded-lg shadow-md bg-white dark:bg-suface-dark overflow-hidden" align="start">
          <Calendar
            mode="single"
            selected={selected}
            captionLayout="dropdown"
            onSelect={date => {
              onSelect?.(date);
              setOpen(false);
            }}
            className="w-full dark:bg-suface-dark"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
