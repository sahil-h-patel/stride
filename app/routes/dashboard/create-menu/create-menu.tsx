import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { ListPlus, CalendarPlus, Plus } from "lucide-react"
import { useState } from "react"
import { Modal, TaskForm, EventForm } from "./modal"

export default function CreateMenu() {
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false)
  const [showEventModal, setShowEventModal] = useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button><Plus></Plus></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowTaskModal(true)}>
            <ListPlus/>
            Create Task
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowEventModal(true)}>
            <CalendarPlus/>
            Create Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal id="task-modal" showModal={showTaskModal} 
      onClose={() => setShowTaskModal(false)} 
      title="Create Task">
        <TaskForm />
      </Modal>
      <Modal id="event-modal" showModal={showEventModal} 
      onClose={() => setShowEventModal(false)} 
      title="Create Event">
        <EventForm />
      </Modal>
    </>
  );
}