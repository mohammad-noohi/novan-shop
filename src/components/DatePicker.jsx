import { useState } from "react";
import { ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function DatePicker({ lableText }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null); // فقط null یا تاریخ ذخیره میشه

  return (
    <div className="flex items-center gap-3">
      <Label htmlFor="date" className="px-1 shrink-0">
        {lableText}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className="w-full justify-between font-normal">
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4 rounded-lg shadow-md bg-white overflow-hidden" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={selectedDate => {
              setDate(selectedDate);
              setOpen(false);
            }}
            className="w-full"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
