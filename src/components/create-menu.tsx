"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { DatePickerWithPresets } from "./date-picker"
import FormFieldRow from "./form-field-row"
import { Textarea } from "./ui/textarea"
import { DateRangePicker } from "./date-range-picker"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { ListPlus, CalendarPlus } from "lucide-react"

export default function CreateMenu() {
  const [openSheet, setOpenSheet] = useState<"task" | "event" | null>(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button><Plus></Plus></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenSheet("task")}>
            <ListPlus/>
            Create Task
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenSheet("event")}>
            <CalendarPlus/>
            Create Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Task Sheet */}
      <Sheet open={openSheet === "task"} onOpenChange={() => setOpenSheet(null)} >
            <SheetContent side="left">
                <SheetHeader className="pb-0">
                    <SheetTitle>Add Task</SheetTitle>
                    <SheetDescription>
                        Add a new task to your calendar. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 p-4">
                    <FormFieldRow id="name" label="Name" />
                    <FormFieldRow id="deadline" label="Deadline" component={<DatePickerWithPresets/>} className="col-start-4 col-span-8"/>
                    <FormFieldRow id="time" label="Expected Time" className="col-span-8 col-start-4"/>
                    <FormFieldRow id="description" label="Description" component={<Textarea id="description" />} className="col-span-8"/>
                    <FormFieldRow id="priority" label="Priority" component={
                        <Select onValueChange={(value) => console.log("Selected:", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a priority level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    }/>
                    <FormFieldRow id="tags" label="Tags"/>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={() => setOpenSheet(null)} type="submit">Create Task</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
      </Sheet>

      {/* Event Sheet */}
      <Sheet open={openSheet === "event"} onOpenChange={() => setOpenSheet(null)}>
        <SheetContent side="left">
          <SheetHeader className="pb-0">
            <SheetTitle>New Event</SheetTitle>
            <SheetDescription>Add a new event to your calendar. Click save when you&apos;re done.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 p-4">
                    <FormFieldRow id="name" label="Name" />
                    <FormFieldRow id="date-range" label="Date" component={<DateRangePicker/>} className="col-start-4 col-span-8"/>
                    <FormFieldRow id="description" label="Description" component={<Textarea id="description" />} className="col-span-8"/>
                    <FormFieldRow id="reschedule" label="Can this be rescheduled?" component={
                        <RadioGroup defaultValue="yes">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="reschedule-yes" />
                                <Label htmlFor="reschedule-yeso">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="reschedule-no" />
                                <Label htmlFor="reschedule-no">No</Label>
                            </div>
                        </RadioGroup>
                    }/>
                    <FormFieldRow id="tags" label="Tags"/>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={() => setOpenSheet(null)} type="submit">Create Task</Button>
                    </SheetClose>
                </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
