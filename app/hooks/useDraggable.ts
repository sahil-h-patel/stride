import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * A custom React hook to make an element draggable.
 * @returns An object with position, drag handle props, and dragging state.
 */
export function useDraggable() {
  // State for the element's position. This triggers re-renders.

  const [position, setPosition] = useState({x: 100, y: 400});
  const [isDragging, setIsDragging] = useState(false);

  // Ref to store drag information that doesn't need to cause a re-render.
  // This avoids "stale state" issues inside the event listeners.
  const dragInfo = useRef<{
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  // The function to handle mouse movement.
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Only move if a drag has been initiated.
    if (!dragInfo.current) return;

    const deltaX = e.clientX - dragInfo.current.startX;
    const deltaY = e.clientY - dragInfo.current.startY;

    setPosition({
      x: dragInfo.current.initialX + deltaX,
      y: dragInfo.current.initialY + deltaY,
    });
  }, []);

  // The function to handle when the mouse button is released.
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragInfo.current = null;
    document.body.classList.remove('no-select'); // Re-enable text selection

    // Clean up the global event listeners.
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  // The function to handle when a drag is initiated.
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); // Prevent default browser behavior like text selection.
    document.body.classList.add('no-select'); // Disable text selection globally.

    setIsDragging(true);
    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
    };

    // Attach listeners to the document to capture mouse events anywhere on the page.
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [position.x, position.y, handleMouseMove, handleMouseUp]);

  // Cleanup effect to remove listeners if the component unmounts.
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Return the necessary values and event handlers for the component to use.
  return {
    position,
    dragHandleProps: {
      onMouseDown: handleMouseDown,
    },
    isDragging,
  };
}
