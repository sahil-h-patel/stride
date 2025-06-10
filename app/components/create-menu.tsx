import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "~/components/ui/sheet"
import { Button } from "~/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { DatePickerWithPresets } from "./date-picker"
import FormFieldRow from "./form-field-row"
import { DateRangePicker } from "./date-range-picker"
import { ListPlus, CalendarPlus, Plus } from "lucide-react"
import { useState } from "react"
import { Form } from "@remix-run/react"; // Import Form component

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
                {/* Wrap content in a Remix Form */}
                {/* The 'action' prop should point to the route's action where you handle task creation */}
                {/* For example, if you have an action in dashboard.calendar.tsx to handle this */}
                <Form method="post" action="/dashboard/calendar?_action=createTask"> {/* Example action path */}
                    <SheetHeader className="pb-0">
                        <SheetTitle>Add Task</SheetTitle>
                        <SheetDescription>
                            Add a new task to your calendar. Click save when you&apos;re done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 p-4">
                        {/* Ensure your FormFieldRow components are rendering proper HTML inputs with 'name' attributes */}
                        <FormFieldRow id="taskName" type="taskName" label="Name" /> {/* Added name prop */}
                        <FormFieldRow id="deadline" type="deadline" label="Deadline" component={<DatePickerWithPresets/>} className="col-start-4 col-span-8"/>
                        <FormFieldRow id="time" type="time" label="Expected Time" className="col-span-8 col-start-4"/>
                        <FormFieldRow id="description" type="description" label="Description" component={<Textarea id="description" />} className="col-span-8"/>
                        <FormFieldRow id="priority" type="priority" label="Priority" component={
                            <Select onValueChange={(value) => console.log("Selected:", value)}> {/* You'll need to update a hidden input or state for the form submission */}
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
                        <FormFieldRow id="tags" type="tags" label="Tags"/>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            {/* This button will now submit the form */}
                            <Button type="submit" onClick={() => setOpenSheet(null)}>Create Task</Button>
                        </SheetClose>
                    </SheetFooter>
                </Form>
            </SheetContent>
      </Sheet>

      {/* Event Sheet */}
      <Sheet open={openSheet === "event"} onOpenChange={() => setOpenSheet(null)}>
        <SheetContent side="left">
            {/* Wrap content in a Remix Form */}
            <Form method="post" action="/dashboard/calendar?_action=createEvent"> {/* Example action path */}
                <SheetHeader className="pb-0">
                    <SheetTitle>New Event</SheetTitle>
                    <SheetDescription>Add a new event to your calendar. Click save when you&apos;re done.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 p-4">
                    <FormFieldRow id="eventName" type="eventName" label="Name" /> {/* Added name prop */}
                    <FormFieldRow id="date-range" type="dateRange" label="Date" component={<DateRangePicker/>} className="col-start-4 col-span-8"/>
                    <FormFieldRow id="description" type="description" label="Description" component={<Textarea id="description" />} className="col-span-8"/>
                    <FormFieldRow id="reschedule" type="reschedule" label="Can this be rescheduled?" component={
                        <RadioGroup defaultValue="yes">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="reschedule-yes" /> {/* Removed name prop */}
                                <Label htmlFor="reschedule-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="reschedule-no" /> {/* Removed name prop */}
                                <Label htmlFor="reschedule-no">No</Label>
                            </div>
                        </RadioGroup>
                    }/>
                    <FormFieldRow id="tags" type="tags" label="Tags"/>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        {/* This button will now submit the form */}
                        <Button type="submit" onClick={() => setOpenSheet(null)}>Create Event</Button> {/* Changed text */}
                    </SheetClose>
                </SheetFooter>
            </Form>
        </SheetContent>
      </Sheet>
    </>
  )
}