import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {Ellipsis, Trash2, SquarePen} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Badge } from "./ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import {z} from "zod";

export const taskSchema = z.object({
  title: z.string({ required_error: 'Task name is required' }),
  // Use coerce to automatically convert string/number from form to a Date object
  dueDate: z.coerce.date({ required_error: 'A deadline is required' }),
  expectedTime: z.coerce
    .number()
    .min(1, 'Expected time must be at least 1 minute'),
  description: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH'], {
    required_error: 'A priority must be selected',
  }),
  tags: z.preprocess((value) => {
    if (typeof value !== 'string' || value.trim() === '') {
      return []; // Return an empty array if input is not a string or is empty
    }
    // This is the same logic from your action function
    return value.split(',').map(tag => tag.trim()).filter(Boolean);
  }, z.array(z.string()).optional())
});

export interface TaskItemProps {
  id: string;
  title: string;
  dueDate: Date | string;
  updatedAt: Date | string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  tags: string[];
}

export function Task({ id, title, dueDate, updatedAt, priority, tags}: TaskItemProps) {
    return (
        <Card key={id} className="relative pt-2">                
            <Priority priority={priority}/>
            <div className="absolute top-2 right-2 w-min">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-1 h-fit"><Ellipsis/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <SquarePen/>Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                                <Trash2/>Delete
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <CardHeader>
                <div className="flex flex-row gap-x-1">
                    {tags.map((tag, index) => (
                        <Badge key={`${tag}-${index}`} className="w-fit bg-primary/60 hover:bg-primary/60 text-neutral-900 font-medium px-0.5" variant="secondary">{tag}</Badge>
                    ))}
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription className="flex flex-col"> 
                    <p>{format(dueDate, 'eee, MMMM d yyyy')}</p> 
                    <p className="text-xs">Last edited {formatDistanceToNow(updatedAt)} ago</p>
                </CardDescription>
            </CardHeader>
        </Card>
    )
}


function Priority({ priority }: { priority: string }) {
  const dotClasses = "absolute top-3 left-3 h-2.5 w-2.5 rounded-full";
  const pingClasses = "absolute top-3 left-3 h-2.5 w-2.5 rounded-full opacity-75 animate-ping";

  switch (priority) {
    case 'HIGH':
      return (
        <>
          <div className={`${pingClasses} bg-red-400 [animation-duration:0.8s]`} />
          <div className={`${dotClasses} bg-red-500`} />
        </>
      );
    case 'MEDIUM':
      return (
        <>
          <div className={`${pingClasses} bg-yellow-400 [animation-duration:1.5s]`} />
          <div className={`${dotClasses} bg-yellow-500`} />
        </>
      );
    case 'LOW':
      return (
        <>
          <div className={`${dotClasses} bg-green-500`} />
        </>
      );
    default:
      return null;
  }
}