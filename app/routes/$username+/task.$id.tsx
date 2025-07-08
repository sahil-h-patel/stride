import { Form, useActionData, useNavigate, useParams } from 'react-router';
import { type ActionFunctionArgs } from 'react-router';
import { useForm, getInputProps, getSelectProps, getTextareaProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { Button } from '~/components/ui/button';
import { 
  DateTimeField, 
  Field, 
  SelectField, 
  TextareaField, 
  TimeField 
} from '~/components/fields';
import { Input } from '~/components/ui/input';

// Import server-side utilities
import { prisma } from '~/lib/prisma';
import { requireUserId } from '~/lib/auth.server';
import { cn } from '~/lib/utils';
import { X } from 'lucide-react';
import { taskSchema } from '~/components/task';

// --- ACTION FUNCTION ---
export async function action({ request, params }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const username = params.username;

  if (!username) {
    return parseWithZod(new FormData(), { schema: taskSchema }).reply({
      formErrors: ['Username is required'],
    });
  }

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: taskSchema });

  if (submission.status !== 'success') {
    return (submission.reply());
  }

  try {
    await prisma.task.create({
      data: {
        ...submission.value,
        userId: userId
      },
    });
  } catch (error) {
    console.error("Database creation failed:", error);
    return (submission.reply({ 
        formErrors: ['Failed to create task due to a server error.'] 
    }));
  }
  
  return {...submission.reply({ resetForm: true }), status: 'success' };
}

export default function EditTaskPage() {
  const actionData = useActionData<typeof action>();
  const params = useParams();
  const navigate = useNavigate();
  
  const [form, fields] = useForm({
    lastResult: actionData?.initialValue,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: taskSchema });
    },
    shouldRevalidate: 'onInput',
  });

  if (!params.username) {
      return <div>Error: Username not found in URL.</div>;
  }

  return (
    <div className="p-4 sm:p-8 min-h-full flex items-center">
      <Form method="post" id={form.id} onSubmit={form.onSubmit} className='w-1/2 m-auto'>
        <div className='flex flex-row justify-between items-start'>
            <Input
                {...getInputProps(fields.title, { type: 'text' })}
                placeholder="New Task"
                className={cn(
                  "h-auto p-2 pl-0 mb-6",
                  "md:text-2xl text-2xl font-bold placeholder:text-2xl placeholder:font-bold",
                  "border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                )}
            />
            <Button type="button" variant="ghost" onClick={() => navigate(-1)}><X/></Button>
        </div>
        <div className="flex flex-col gap-2">
          <DateTimeField
            labelProps={{ children: 'Deadline' }}
            dateTimePickerProps={{ ...getInputProps(fields.dueDate, { type: 'hidden' }) }}
            errors={fields.dueDate.errors}
          />
          <TimeField
            labelProps={{ children: 'Expected Time' }}
            hiddenInputProps={{ ...getInputProps(fields.expectedTime, { type: 'hidden' }) }}
            errors={fields.expectedTime.errors}
          />
          <SelectField
            labelProps={{ children: 'Priority' }}
            selectProps={{ ...getSelectProps(fields.priority),
                defaultValue: fields.priority?.defaultValue !== undefined
                  ? String(fields.priority.defaultValue)
                  : undefined,}}
            placeholder="Select a priority..."
            items={[{ value: 'LOW', label: 'Low' }, { value: 'MEDIUM', label: 'Medium' }, { value: 'HIGH', label: 'High' }]}
            errors={fields.priority.errors}
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
          <div className="flex gap-2 mt-4 justify-end">
            <Button type="submit">Create Task</Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
