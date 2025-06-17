import { useState, useEffect } from 'react';

// 1. Define an interface for the shape of our position state
interface Position {
  x: number;
  y: number;
}

/**
 * A custom React hook that tracks the mouse position.
 * @returns The current mouse position { x: number, y: number }
 */
export function useMousePosition(): Position {
  // 2. Use the Position interface to type the state
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    // 3. Type the event parameter as a `MouseEvent`
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add the event listener to the window
    window.addEventListener('mousemove', handleMouseMove);

    // Return a cleanup function to remove the event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return position;
}
