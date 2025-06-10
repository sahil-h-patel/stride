import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import * as React from "react";

type Props = {
  id: string;
  label: string;
  type?: string;
  component?: React.ReactNode;
  className?: string;
};

export default function FormFieldRow({
  id,
  label,
  component,
  type,
  className = "col-span-9"
}: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="col-span-2 text-right">
        {label}
      </Label>
      <div className={`col-start-4 col-span-8 ${className}`}>
        {component ? component : <Input id={id} type={type}/>}
      </div>
    </div>
  );
}
