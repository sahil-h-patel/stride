import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { FormField } from "~/components/form-field";
import { DateRangePicker } from "~/components/date-range-picker";

function RescheduleOption() {
    return (
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
    );
}

export default function EventForm() {
    return(
        <div className="flex flex-col gap-4 p-4">
            <FormField id="eventName" label="Name"><Input id="eventName"/></FormField>
            <FormField id="date-range" label="Date"><DateRangePicker/></FormField>
            {/** @todo: Add FormField for when Event Repeats **/}
            <FormField id="description" label="Description"><Textarea id="description"/></FormField>
            <FormField id="reschedule" label="Can this be rescheduled?"><RescheduleOption/></FormField>
            <FormField id="tags" label="Tags"><Input id="tags"/></FormField>
        </div>
    );
}
