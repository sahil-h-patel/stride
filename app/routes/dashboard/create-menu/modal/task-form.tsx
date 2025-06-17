import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { DateTimePicker } from "~/components/date-time-picker";
import { FormField } from "~/components/form-field";
import { useState } from "react";

export default function TaskForm() {
    return(
        <div className="flex flex-col gap-4 p-4">
            <FormField id="taskName" label="Name"><Input id="taskName"/></FormField>
            <FormField id="deadline" label="Deadline"><DateTimePicker/></FormField>
            <FormField id="time" label="Expected Time"><TimeSelect/></FormField>
            <FormField id="description" label="Description"><Textarea id="description"/></FormField>
            <FormField id="priority" label="Priority"><PrioritySelect/></FormField>
            <FormField id="tags" label="Tags"><Input id="tags"/></FormField>
        </div>
    );
}

function TimeSelect() {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({length: 59}, (_, i) => i + 1);

  const [selectedHour, setSelectedHour] = useState('')
  const [selectedMinute, setSelectedMinute] = useState('')

  // 2. Helper variables to determine the correct label
  const hourLabel = parseInt(selectedHour) > 1 ? "Hours" : "Hour";
  const minuteLabel = parseInt(selectedMinute) > 1 ? "Minutes" : "Minute";

return (
    <div className="flex flex-row gap-3 items-center">
        <div className="flex flex-row gap-x-2 items-center">
            <Select onValueChange={setSelectedHour} value={selectedHour}>
                <SelectTrigger>
                    <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {hours.map((hour) => (
                            <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>     
            <Label>{hourLabel}</Label>
        </div>
        <div className="flex flex-row gap-x-2 items-center">
            <Select onValueChange={setSelectedMinute} value={selectedMinute}>
                <SelectTrigger>
                    <SelectValue placeholder="Minute"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {minutes.map((minute) => (
                            <SelectItem key={minute} value={minute.toString()}>{minute}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>   
            <Label>{minuteLabel}</Label>     
        </div>
    </div>
    );
}
    
function PrioritySelect() {
    return(
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
    )
}