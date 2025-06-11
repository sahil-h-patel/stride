import { useState } from "react"
import { Button } from "~/components/ui/button"
import { X } from "lucide-react"
import TaskForm from "./task-form"

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
}

export default function Modal({ showModal, onClose }: ModalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 })
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 })
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true)
    setInitialMousePosition({ x: e.clientX, y: e.clientY })
    setInitialPosition({ x: position.x, y: position.y })
  }
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      const deltaMove = {
        x: e.clientX - initialMousePosition.x,
        y: e.clientY - initialMousePosition.y,
      }
      setPosition({
        x: initialPosition.x + deltaMove.x,
        y: initialPosition.y + deltaMove.y,
      })
    }
  }
  const handleMouseUp = () => {
    setIsDragging(false)
  }
    // 1. If showModal is false, render nothing.
  if (!showModal) {
    return null;
  }
  return (
    <div
      className="fixed z-50 bg-white shadow-lg rounded-lg p-6 dark:bg-muted"
      style={{ transform: `translate(${position.x}px, ${position.y}px)`, cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Task</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5"/>
        </Button>
      </div>
        <TaskForm/>
    </div>
  )
}