import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { ListPlus, CalendarPlus, Plus } from "lucide-react"
import { useState } from "react"
import Modal from "./modal"

export default function CreateMenu() {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button><Plus></Plus></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowModal(true)}>
            <ListPlus/>
            Create Task
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowModal(true)}>
            <CalendarPlus/>
            Create Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal showModal={showModal} onClose={() => setShowModal(false)} ></Modal>
      {/* Event Sheet */}
      {/* <Sheet open={openSheet === "event"} onOpenChange={() => setOpenSheet(null)}>
        <SheetContent side="left">
\            <Form method="post" action="/dashboard/calendar?_action=createEvent">
                <SheetHeader className="pb-0">
                    <SheetTitle>New Event</SheetTitle>
                    <SheetDescription>Add a new event to your calendar. Click save when you&apos;re done.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 p-4">
                    <FormFieldRow id="eventName" type="eventName" label="Name" /> 
                    <FormFieldRow id="date-range" type="dateRange" label="Date" component={<DateRangePicker/>} className="col-start-4 col-span-8"/>
                    <FormFieldRow id="description" type="description" label="Description" component={<Textarea id="description" />} className="col-span-8"/>
                    <FormFieldRow id="reschedule" type="reschedule" label="Can this be rescheduled?" component={
                        <RadioGroup defaultValue="yes">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="reschedule-yes" />
                                <Label htmlFor="reschedule-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="reschedule-no" />
                                <Label htmlFor="reschedule-no">No</Label>
                            </div>
                        </RadioGroup>
                    }/>
                    <FormFieldRow id="tags" type="tags" label="Tags"/>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" onClick={() => setOpenSheet(null)}>Create Event</Button>
                    </SheetClose>
                </SheetFooter>
            </Form>
        </SheetContent>
      </Sheet> */}
    </>
  );
}