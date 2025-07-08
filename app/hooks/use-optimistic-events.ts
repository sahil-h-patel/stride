import { useFetchers } from 'react-router';
import { isValid } from 'date-fns';
import { type EventSchema } from '~/components/event'; // Adjust path as needed

/**
 * A custom hook to find in-flight event submissions and return them
 * as temporary, optimistic event objects.
 */
export function useOptimisticEvents(): EventSchema[] {
  const fetchers = useFetchers();

  const optimisticEvents = fetchers
    // 1. Find all the fetchers that are submitting to our event creation action
    .filter(fetcher => fetcher.formAction?.endsWith('/event/new'))
    .map(fetcher => {
      const formData = fetcher.formData;
      
      // 2. Safely parse the form data
      const title = formData?.get('eventName');
      const startTimeString = formData?.get('startTime');
      const endTimeString = formData?.get('endTime');
      const color = formData?.get('color');

      // 3. Validate that all required data is present and of the correct type
      if (
        typeof title !== 'string' ||
        typeof startTimeString !== 'string' ||
        typeof endTimeString !== 'string' ||
        typeof color !== 'string'
      ) {
        return null;
      }
      
      const startTime = new Date(startTimeString);
      const endTime = new Date(endTimeString);

      // 4. Ensure the dates are valid after parsing
      if (!isValid(startTime) || !isValid(endTime)) {
        return null;
      }

      // 5. Return a perfectly typed event object
      return {
        id: `optimistic-${Date.now()}`,
        title,
        startTime,
        endTime,
        color,
      };
    })
    // 6. Filter out any null entries that failed validation
    .filter(Boolean as unknown as (value: EventSchema | null) => value is EventSchema);

  return optimisticEvents;
}