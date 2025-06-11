import { useState } from "react";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({length: 59}, (_, i) => i + 1);

export default function TimeSelect() {
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
                            <SelectItem value={hour.toString()}>{hour}</SelectItem>
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
                            <SelectItem value={minute.toString()}>{minute}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>   
            <Label>{minuteLabel}</Label>     
        </div>
    </div>
    );
}
    