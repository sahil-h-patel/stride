import { redirect } from '@remix-run/node';

export const loader = () => {
  throw redirect('/dashboard/calendar');
};