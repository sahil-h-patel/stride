import { Form, useActionData, useNavigate, useParams } from 'react-router';
import { type ActionFunctionArgs } from 'react-router';
import { useForm, getInputProps, getTextareaProps, type FieldMetadata } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { Button } from '~/components/ui/button';
import { 
  ColorPickerField,
  DateTimeField, 
  Field, 
  RadioGroupField, 
  TextareaField, 
} from '~/components/fields';
import { Input } from '~/components/ui/input';

// Import server-side utilities
import { prisma } from '~/lib/prisma';
import { requireUserId } from '~/lib/auth.server';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';
import { useEffect } from 'react';
import { eventSchema } from '~/components/event';

// --- ACTION FUNCTION ---
export async function action({ request, params }: ActionFunctionArgs) {
  const id = await requireUserId(request);
  const username = params.username;

  if (!username) {
      return parseWithZod(new FormData(), { schema: eventSchema }).reply({
        formErrors: ['Username is required'],
      });
    }

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: eventSchema });

  if (submission.status !== 'success') {
    return (submission.reply());
  }

  try {
    await prisma.event.create({
      data: {
        ...submission.value,
        userId: id
      },
    });
  } catch (error) {
    console.error("Database creation failed:", error);
    return (submission.reply({ 
        formErrors: ['Failed to create event due to a server error.'] 
    }));
  }
  
return {...submission.reply({ resetForm: true }), status: 'success' };

}

export default function NewEventPage() {
  const actionData = useActionData<typeof action>();
  const params = useParams();
  const navigate = useNavigate()
  
  const [form, fields] = useForm({
    lastResult: actionData?.initialValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventSchema });
    },
    shouldRevalidate: 'onInput',
  });

  useEffect(() => {
    // DEBUG 2: Log a message to confirm the useEffect hook is running
    console.log("useEffect is running. Checking actionData status...");
    
    // DEBUG 3: Log the specific status value
    console.log("actionData?.status is:", actionData?.status);

    if (actionData?.status === 'success') {
      console.log("Success status found! Navigating back.");
      navigate(-1);
    }
  }, [actionData, navigate]);

  if (!params.username) {
    return <div>Error: Username not found in URL.</div>;
  }

  return (
    <div className="p-4 sm:p-8 min-h-full flex items-center">
      <Form method="post" id={form.id} onSubmit={form.onSubmit} className="w-1/2 m-auto">
        <div className='flex flex-row justify-between items-start'>
            <Input
                {...getInputProps(fields.title, { type: 'text' })}
                placeholder="New Event"
                className={cn(
                  "h-auto p-2 pl-0 mb-6",
                  "md:text-2xl text-2xl font-bold placeholder:text-2xl placeholder:font-bold",
                  "border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                )}
            />
              <Button type="button" variant="ghost" onClick={() => navigate(-1)}><X/></Button>
        </div>
        <div className="flex flex-col gap-1">
          <DateTimeField
            labelProps={{ children: 'Start Time' }}
            dateTimePickerProps={{ ...getInputProps(fields.startTime, { type: 'hidden' }) }}
            errors={fields.startTime.errors}
          />
          <DateTimeField
            labelProps={{ children: 'End Time' }}
            dateTimePickerProps={{ ...getInputProps(fields.endTime, { type: 'hidden' }) }}
            errors={fields.endTime.errors}
          />
          <RadioGroupField
            labelProps={{ children: 'Can this be rescheduled?' }}
            field={fields.isRescheduable as FieldMetadata<string>}
            items={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
          />
          <Field
            labelProps={{ children: 'Tags' }}
            inputProps={getInputProps(fields.tags, { type: 'text' })}
            errors={fields.tags.errors}
          />
          <TextareaField
            labelProps={{ children: 'Description' }}
            textareaProps={{...getTextareaProps(fields.description), rows: 7}}
            errors={fields.description.errors}
          />
          <ColorPickerField
            labelProps={{ children: 'Color' }}
            hiddenInputProps={{ ...getInputProps(fields.color, { type: 'hidden' }) }}
            errors={fields.color.errors}
          />
          <div className="flex gap-2 mt-4 justify-end">
            <Button type="submit">Create Event</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
