import { Label } from "~/components/ui/label";

type FormFieldProps = {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function FormField(props: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={props.id} className="col-span-2 text-left">
        {props.label}
      </Label>
      <div className={`${props.className}`}>
        {props.children}
      </div>
    </div>
  );
}
