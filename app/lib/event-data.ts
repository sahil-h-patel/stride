// Define the shape (type) of a single event object
export type CalendarEvent = {
  title: string;
  startTime: Date;
  endTime: Date;
  color: string;
};

// --- Mock Data ---
// In a real application, this data would come from your database via a loader.
export const mockEvents: CalendarEvent[] = [
    {
        title: "Team Meeting",
        startTime: new Date(2025, 5, 29, 10, 0), // June 29, 2025 at 10:00 AM
        endTime: new Date(2025, 5, 29, 11, 30),
        color: 'bg-blue-500/80 text-white'
    },
    {
        title: "Design Review",
        startTime: new Date(2025, 6, 1, 14, 0), // July 1, 2025 at 2:00 PM
        endTime: new Date(2025, 6, 1, 15, 45),
        color: 'bg-green-500/80 text-white'
    },
    {
        title: "Doctor's Appointment",
        startTime: new Date(2025, 6, 2, 9, 15), // July 2, 2025 at 9:15 AM
        endTime: new Date(2025, 6, 2, 10, 5),
        color: 'bg-red-500/80 text-white'
    },
];
