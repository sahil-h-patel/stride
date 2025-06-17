import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
import { useDraggable } from "~/hooks/useDraggable";

interface ModalProps {
  id: string;
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function Modal(props: ModalProps) {
  const { position, dragHandleProps, isDragging } = useDraggable();
  
  if (!props.showModal) {
    return null;
  }
  return (
    <div
      className="fixed z-50 bg-white shadow-lg rounded-lg dark:bg-sidebar flex flex-col overflow-hidden"
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`}}
      >
      {/* 1. This div is now the main header and the entire drag handle */}
      <div
        className="flex items-center justify-between p-4 border-b select-none bg-sidebar-accent"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        // 2. The drag props are applied to this parent div
        {...dragHandleProps}
      >
        {/* The title is just a child element now */}
        <h3 id="modal-title" className="text-lg font-medium">
          {props.title}
        </h3>

        {/* The close button is also a child, but it's inside the draggable area.
            We need to stop mouse down events on the button itself so that
            clicking it doesn't start a drag. */}
        <Button
          variant="ghost"
          size="icon"
          onClick={props.onClose}
          onMouseDown={(e) => e.stopPropagation()} // 3. This prevents dragging when clicking the button
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* The modal's content area */}
      <div className="p-6">
        {props.children}
      </div>
    </div>
  );
}
