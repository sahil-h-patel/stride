import { format, differenceInMinutes, getDay } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from './ui/button';
import { Ellipsis, SquarePen, Trash2 } from 'lucide-react';
import {z} from 'zod';
import { Link, useOutletContext } from 'react-router';
import { User } from '@prisma/client';

export const eventSchema = z.object({
  title: z.string({ required_error: 'Event name is required' }),
  startTime: z.coerce.date({ required_error: 'A start time is required' }),
  endTime: z.coerce.date({ required_error: 'An end time is required' }),
  description: z.string().optional(),
  isRescheduable: z.preprocess(
    (value) => value === 'yes', // This converts the string "yes" to a boolean `true`, and anything else to `false`
    z.boolean() // The final validated type will be a boolean
  ),
   tags: z.preprocess((value) => {
    if (typeof value !== 'string' || value.trim() === '') {
      return []; // Return an empty array if input is not a string or is empty
    }
    // This is the same logic from your action function
    return value.split(',').map(tag => tag.trim()).filter(Boolean);
  }, z.array(z.string()).optional()), // The final validated type is an optional array of strings
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Invalid color format'),
}).refine(data => data.endTime > data.startTime, {
    message: 'End time must be after start time',
    path: ['endTime'], // Assign error to the endTime field
});

export type EventItemProps = {
  id: string,
  title: string,
  startTime: Date | string,
  endTime: Date | string,
  color: string
}

export function Event({id, title, startTime, endTime, color }: EventItemProps) {
  const col = getDay(startTime) + 1;
  const startOfDay = new Date(startTime).setHours(0,0,0,0);
  const minutesFromStartOfDay = differenceInMinutes(startTime, startOfDay);
  const rowStart = (minutesFromStartOfDay / 5) + 1;
  const minutesFromStartOfDayEnd = differenceInMinutes(endTime, startOfDay);
  const rowEnd = (minutesFromStartOfDayEnd / 5) + 1;
  const user = useOutletContext<User>()

  const eventStyle = {
    gridColumnStart: col,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd,
    backgroundColor: color,
  };

  return ( 
    <div 
      key={id}
      style={eventStyle} 
      className=
        "relative flex flex-col p-2 rounded-lg overflow-hidden m-px z-20" // Use z-20 to ensure events are above grid lines
    >
        <div className="absolute top-2 right-2 w-min">
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="hover:bg-[${color}] p-1 h-fit"><Ellipsis/></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link to={`/${user.username}/event/${id}`}>
                            </Link>
                              <SquarePen/>Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                              <Trash2/>Delete
                          </DropdownMenuItem>
                      </DropdownMenuGroup>
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
        <p className="font-semibold text-sm leading-tight">{title}</p>
        <p className="text-xs">{`${format(startTime, 'h:mm a')} - ${format(endTime, 'h:mm a')}`}</p>
    </div>
  );
}
