import { Textarea } from "~/components/ui/textarea";
import { DateTimePicker } from "./date-time-picker";
import FormFieldRow from "./form-field-row";
import TimeSelect from "./time-select";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "~/components/ui/select";

export default function TaskForm() {
    return(
        <div className="grid gap-4 p-4">
            {/* Ensure your FormFieldRow components are rendering proper HTML inputs with 'name' attributes */}
            <FormFieldRow id="taskName" type="taskName" label="Name" /> {/* Added name prop */}
            <FormFieldRow id="deadline" type="deadline" label="Deadline" component={<DateTimePicker/>} className="col-start-4 col-span-8"/>
            <FormFieldRow id="time" type="time" label="Expected Time" component={<TimeSelect/>} className="items-center"/>
            <FormFieldRow id="description" type="description" label="Description" component={<Textarea id="description"/>} className="col-span-8"/>
            <FormFieldRow id="priority" type="priority" label="Priority" component={
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
            }/>
            <FormFieldRow id="tags" type="tags" label="Tags"/>
        </div>
    );
}