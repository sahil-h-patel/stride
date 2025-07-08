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
// import { DateTimePicker } from "~/components/date-time-picker";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, CircleX } from 'lucide-react'
import { HexColorPicker } from "react-colorful";
import { FieldMetadata, getCollectionProps, getInputProps } from "@conform-to/react";
import { addDays, format } from "date-fns";
import { cn } from "~/lib/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Calendar } from "./ui/calendar";

function Errors({
    id, 
    errors
  }: {
    errors?: Array<string | null | undefined> | null | undefined, 
    id?: string}) {
  
      const renderedErrors = errors?.filter(Boolean)
      if(!renderedErrors?.length) return null
      return (
        <ul id={id} className="flex flex-col gap-1">
          {renderedErrors.map((e) => (
            <div key={e}  className="flex items-center flex-row gap-1">
              <CircleX color="#E1666C" className="size-3"/>
              <li className="text-destructive text-[10px]">
                {e}
              </li>
            </div>
          ))}
        </ul>
      )
} 

export function Field({
  labelProps,
  inputProps,
  errors,
  className
}:{
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>,
  inputProps: React.InputHTMLAttributes<HTMLInputElement>,
  errors: Array<string | null | undefined> | null | undefined,
  className?: string,
}) {
  const id = inputProps.id
  const errorId = errors?.length ? `${id}-error` : undefined
  return (
    <div className={className}>
      <Label htmlFor={id} {...labelProps} className="col-span-2 text-left"/>
      <Input
        id={id}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
				{...inputProps}
      />
      {errorId ? (
        <div className="pr-4 pt-1 pb-3">
          <Errors id={errorId} errors={errors ?? []} />
        </div>
      ) : null}   
    </div>
  );
}

export function TextareaField({
  labelProps,
  textareaProps,
  errors,
  className
}:{
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>,
  textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  errors: Array<string | null | undefined> | null | undefined,
  className?: string,
}) {
  const id = textareaProps.id
  const errorId = errors?.length ? `${id}-error` : undefined
  return (
    <div>
      <Label htmlFor={id} {...labelProps} className="col-span-2 text-left"/>
      <Textarea
        id={id}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
				{...textareaProps}
        className={className}
      />
      {errorId ? (
        <div className="pr-4 pt-1 pb-3">
          <Errors id={errorId} errors={errors ?? []} />
        </div>
      ) : null}      
    </div>
  );
}


export function RadioGroupField({
  labelProps,
  field,
  items,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement> & { children: React.ReactNode };
  field: FieldMetadata<string>;
  items: Array<{ value: string; label: React.ReactNode }>;
  className?: string;
}) {
  const errorId = field.errors?.length ? `${field.name}-error` : undefined;
  const labelId = `${field.name}-label`;

  const collectionProps = getCollectionProps(field, {
    type: 'radio',
    options: items.map(item => item.value),
  });

  return (
    <div className={className}>
      <Label id={labelId} {...labelProps} />
      <RadioGroup
        name={field.name}
        defaultValue={field.initialValue}
        aria-labelledby={labelId}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        className="flex flex-col space-y-2 pt-2"
      >
        {items.map((item, index) => {
          const { key, ...itemProps } = collectionProps[index];
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { type, ...finalItemProps } = itemProps;
          return (
            <div key={key} className="flex items-center space-x-2">
              <RadioGroupItem {...finalItemProps} />
              <Label htmlFor={finalItemProps.id} className="font-normal">
                {item.label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
      {errorId ? (
        <div className="pr-4 pt-1 pb-3">
          <Errors id={errorId} errors={field.errors ?? []} />
        </div>
      ) : null}
    </div>
  );
}


export function SelectField({
  labelProps,
  selectProps,
  items,
  placeholder,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement> & { children: React.ReactNode };
  // Props for the main <Select> component, including `name` and `defaultValue`
  selectProps: React.ComponentProps<typeof Select>;
  // The options for the select dropdown
  items: Array<{ value: string; label: React.ReactNode }>;
  placeholder?: string;
  errors?: Array<string | null | undefined> | null | undefined;
  className?: string;
}) {
  // The trigger button is the main interactive element, so it gets the ID
  const id = selectProps.name;
  const errorId = errors?.length ? `${id}-error` : undefined;

  return (
    <div className={className}>
      <Label htmlFor={id} {...labelProps} />
      <Select {...selectProps}>
        <SelectTrigger
          id={id}
          className="w-full"
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errorId ? (
        <div className="pr-4 pt-1 pb-3">
          <Errors id={errorId} errors={errors ?? []} />
        </div>
      ) : null}   
    </div>
  );
}

export function DateTimeField({
  labelProps,
  dateTimePickerProps,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement> & { children: React.ReactNode };
  dateTimePickerProps: ReturnType<typeof getInputProps>;
  errors?: Array<string | null | undefined> | null | undefined;
  className?: string;
}) {
  const { name, defaultValue } = dateTimePickerProps;
  const errorId = errors?.length ? `${name}-error` : undefined;

  const [date, setDate] = useState<Date | undefined>(() => {
    if (typeof defaultValue === 'string' && defaultValue) {
      const d = new Date(defaultValue);
      if (!isNaN(d.getTime())) return d;
    }
    return undefined;
  });
  const [isOpen, setIsOpen] = useState(false);
 
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) setDate(selectedDate);
  };
  const handleTimeChange = (type: "hour" | "minute" | "ampm", value: string) => {
    const newDate = date ? new Date(date) : new Date();
    if (type === "hour") newDate.setHours((parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0));
    else if (type === "minute") newDate.setMinutes(parseInt(value));
    else if (type === "ampm") {
      const currentHours = newDate.getHours();
      if (value === "PM" && currentHours < 12) newDate.setHours(currentHours + 12);
      else if (value === "AM" && currentHours >= 12) newDate.setHours(currentHours - 12);
    }
    setDate(newDate);
  };
 
  return (
    <div className={className}>
      <Label htmlFor={name} {...labelProps} />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="ghost"
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            aria-invalid={errorId ? true : undefined}
            aria-describedby={errorId}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MM/dd/yyyy hh:mm aa") : <span>MM/DD/YYYY hh:mm aa</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 space-y-2">
            <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-lg"
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.reverse().map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      date && date.getHours() % 12 === hour % 12
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      date && date.getMinutes() === minute
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="">
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      date &&
                      ((ampm === "AM" && date.getHours() < 12) ||
                        (ampm === "PM" && date.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        </PopoverContent>
      </Popover>
      {/* This hidden input holds the value for the form */}
      <input {...dateTimePickerProps} type="hidden" value={date ? date.toISOString() : ''} />
      {errorId ? (
        <div className="pr-4 pt-1 pb-3">
          <Errors id={errorId} errors={errors ?? []} />
        </div>
      ) : null}
    </div>
  );
}

export function TimeField({
  labelProps,
  hiddenInputProps,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement> & { children: React.ReactNode };
  // We interact with the form via a hidden input
  hiddenInputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errors: Array<string | null | undefined> | null | undefined;
  className?: string;
}) {
  const { name: id, defaultValue } = hiddenInputProps;
  const errorId = errors?.length ? `${id}-error` : undefined;
  const hours = Array.from({ length: 24 }, (_, i) => ({ value: i.toString(), label: i.toString() }));
  const minutes = Array.from({ length: 12 }, (_, i) => ({ value: (i * 5).toString(), label: (i * 5).toString().padStart(2, '0') }));

  // Calculate initial state from defaultValue (assuming total minutes)
  const initialMinutes = typeof defaultValue === 'string' ? parseInt(defaultValue, 10) : 0;
  const initialHour = Math.floor(initialMinutes / 60);
  const initialMinute = initialMinutes % 60;

  const [hour, setHour] = useState(initialHour.toString());
  const [minute, setMinute] = useState(initialMinute.toString());
  const [totalMinutes, setTotalMinutes] = useState(initialMinutes);

  // When the user changes the hour or minute, update the total minutes for the hidden input
  useEffect(() => {
    const newTotalMinutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);
    setTotalMinutes(newTotalMinutes);
  }, [hour, minute]);

  return (
    <div className={className}>
      <Label {...labelProps} />
      
      {/* This div groups the controls and gets the ARIA attributes */}
      <div
        className="flex flex-row gap-3 items-center pt-2"
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
      >
        <SelectField
          labelProps={{ children: 'Hour', className: 'sr-only' }} // Visually hidden label
          selectProps={{ onValueChange: setHour, value: hour }}
          items={hours} 
        />
        <span>:</span>
        <SelectField
          labelProps={{ children: 'Minute', className: 'sr-only' }} // Visually hidden label
          selectProps={{ onValueChange: setMinute, value: minute }}
          items={minutes}         
        />
      </div>

      {/* This is the actual input that Conform/Remix will see */}
      <input className="hidden" type="hidden" value={totalMinutes} {...hiddenInputProps} />

      {errorId ? (
        <div className="pr-4 pt-1 pb-3">
          <Errors id={errorId} errors={errors ?? []} />
        </div>
      ) : null}   
    </div>
  );
}

export function ColorPickerField({
  labelProps,
  hiddenInputProps,
  errors,
  className,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement> & { children: React.ReactNode };
  // Props for the hidden input that holds the color value for the form
  hiddenInputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errors: Array<string | null | undefined> | null | undefined;
  className?: string;
}) {
  const { name: id, defaultValue } = hiddenInputProps;
  const errorId = errors?.length ? `${id}-error` : undefined;

  const [color, setColor] = useState(defaultValue?.toString() || '#aabbcc');

  return (
    <div className={className}>
      <Label htmlFor={id} {...labelProps} />
      
      <Popover>
        <PopoverTrigger asChild>
          {/* This button is the main interactive element, so it gets the ARIA attributes */}
          <Button
            id={id}
            variant="ghost"
            className="w-full justify-start text-left font-normal mt-2"
            aria-invalid={errorId ? true : undefined}
            aria-describedby={errorId}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-5 w-5 rounded border"
                style={{ backgroundColor: color }}
              />
              <span>{color}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto border-none p-0">
          <HexColorPicker color={color} onChange={setColor} />
        </PopoverContent>
      </Popover>

      {/* This hidden input provides the value to the form */}
      <input type="hidden" value={color} {...hiddenInputProps} />

      {errorId ? (
        <div className="pr-4 pt-1 pb-3">
          <Errors id={errorId} errors={errors ?? []} />
        </div>
      ) : null}   
    </div>
  );
}
