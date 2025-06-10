// import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
// import { getDay, format } from 'date-fns';

// export default function DayView() {
//     const hours = Array.from({ length: 24 }).map((_, index) =>
//       format(new Date(0, 0, 0, index), "h a")
//     )
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const today = days[getDay(Date.now())];

//     return (
//      <div className="flex flex-col w-[97vw]">
//         <div className="flex text-center mx-auto p-2">
//             <div className="font-semibold">{today}</div>
//         </div>
//           <ScrollArea className="w-[97vw] h-[93vh] overflow-hidden">
//             <div className="flex flex-row relative">
//                 <div className="flex flex-col w-16 text-xs text-gray-500 border-r">
//                     {hours.map((hour, i) => (
//                     <div key={i} className="h-14 text-end pt-1 pr-1">
//                         {hour}
//                     </div>
//                     ))}
//                 </div>
//                 <div className="grid grid-rows-24 w-full h-full border-t border-l">
//                     {Array.from({length: 24}).map((_, index) => (
//                         <div
//                         key={index}
//                         className="border-r border-b h-20"
//                         >
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <ScrollBar orientation="vertical" />
//           </ScrollArea>
//       </div>
//     );
// }

// import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
// import { getDay, format } from 'date-fns';

// // --- Step 3: Event Data and Calculation Logic ---

// // Sample event data
// const events = [
//   {
//     title: 'Morning Standup',
//     start: new Date(2025, 5, 10, 9, 0), // Note: Month is 0-indexed (5 = June)
//     end: new Date(2025, 5, 10, 9, 15),
//     color: 'bg-blue-200 border-blue-400',
//   },
//   {
//     title: 'Design Review',
//     start: new Date(2025, 5, 10, 10, 15),
//     end: new Date(2025, 5, 10, 11, 45),
//     color: 'bg-green-200 border-green-400',
//   },
// ];

// /**
//  * Calculates the grid row position and span for an event.
//  * @param {Date} start - The start time of the event.
//  * @param {Date} end - The end time of the event.
//  * @returns {{startRow: number, span: number}}
//  */
// function getEventGridPosition(start: Date, end: Date) {
//   // Calculate start row (1-indexed)
//   const startHour = start.getHours();
//   const startMinute = start.getMinutes();
//   // Each row is a 15-minute interval. +1 because grid rows are 1-based.
//   const startRow = (startHour * 4) + (startMinute / 15) + 1;

//   // Calculate duration and span
//   const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
//   const span = Math.max(1, Math.ceil(durationInMinutes / 15)); // Event must span at least 1 row

//   return { startRow, span };
// }


// export default function DayView() {
//     const hours = Array.from({ length: 24 }).map((_, index) =>
//       format(new Date(0, 0, 0, index), "h a")
//     )
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     // Let's use today's date for consistency with the event data
//     const today = days[getDay(new Date(2025, 5, 10))];

//     return (
//      <div className="flex flex-col w-[97vw]">
//         <div className="flex text-center mx-auto p-2">
//             <div className="font-semibold">{today}</div>
//         </div>

//         <ScrollArea className="h-[85vh] overflow-hidden border rounded-md">
//             {/* The entire layout is one single grid */}
//             <div className="grid grid-cols-[auto_1fr] grid-rows-96 relative pt-3">
//                 {/* --- Column 1: Hour Markers --- */}
//                 {hours.map((hour, i) => (
//                     // Each hour label spans 4 of our 15-minute rows
//                     <div
//                         key={i}
//                         className="row-span-4 text-end pr-2 -mt-3 text-xs text-gray-500"
//                         style={{ gridRowStart: i * 4 + 1 }}
//                     >
//                        {hour}
//                     </div>
//                 ))}

//                 {/* --- Column 2: Grid Lines --- */}
//                 {Array.from({ length: 96 }).map((_, index) => (
//                     <div
//                         key={index}
//                         // Add a top border only for the hourly lines
//                         className={`h-5 border-r ${ index % 4 === 0 ? 'border-t' : ''}`}
//                     ></div>
//                 ))}

//                 {/* --- Step 4: Render Events on the Grid --- */}
//                 {events.map((event, i) => {
//                     const { startRow, span } = getEventGridPosition(event.start, event.end);
//                     return (
//                         <div
//                             key={i}
//                             className={`absolute w-full p-2 rounded-lg text-xs ${event.color}`}
//                             style={{
//                                 // Place the event in the second column
//                                 gridColumnStart: 2,
//                                 // Use the calculated row start and span
//                                 gridRow: `${startRow} / ${span}`,
//                                 // Add a little inset for style
//                             }}
//                         >
//                             <p className="font-bold">{event.title}</p>
//                             <p>{format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}</p>
//                         </div>
//                     );
//                 })}
//             </div>
//             <ScrollBar orientation="vertical" />
//         </ScrollArea>
//       </div>
//     );
// }

import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';
import { getDay, format } from 'date-fns';

const events = [
  {
    title: 'Standup',
    start: new Date(2025, 5, 10, 9, 0),
    end: new Date(2025, 5, 10, 9, 15),
    color: 'bg-blue-200 border-blue-400',
  },
  {
    title: 'Design Review',
    start: new Date(2025, 5, 10, 10, 15),
    end: new Date(2025, 5, 10, 11, 45),
    color: 'bg-green-200 border-green-400',
  },
  {
    title: 'Quick Sync',
    start: new Date(2025, 5, 10, 13, 40), // 1:40 PM
    end: new Date(2025, 5, 10, 14, 30),  // 2:30 PM (50 minute duration)
    color: 'bg-amber-200 border-amber-400',
  },
  {
    title: 'Planning',
    start: new Date(2025, 5, 10, 9, 30),
    end: new Date(2025, 5, 10, 10, 0), // Ends exactly on the hour
    color: 'bg-rose-200 border-rose-400',
  },
];


function getEventGridPosition(start: Date, end: Date) {
  const startTotalMinutes = start.getHours() * 60 + start.getMinutes();
  let endTotalMinutes = end.getHours() * 60 + end.getMinutes();

  if (end.getHours() === 0 && end.getMinutes() === 0) {
      endTotalMinutes = 24 * 60;
  }

  const startRow = Math.floor(startTotalMinutes / 15) + 1;
  const endRow = Math.ceil(endTotalMinutes / 15) + 1;

  if (startRow >= endRow) {
    return { gridRow: `${startRow} / ${startRow + 1}` };
  }

  return { gridRow: `${startRow} / ${endRow}` };
}


export default function DayView() {
    const hours = Array.from({ length: 24 }).map((_, index) =>
      format(new Date(0, 0, 0, index), "h a")
    )
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[getDay(new Date(2025, 5, 10))];

    return (
     <div className="flex flex-col w-[97vw]">
        <div className="flex text-center mx-auto p-2">
            <div className="font-semibold">{today}</div>
        </div>

        <ScrollArea className="h-[85vh] overflow-hidden border rounded-md">
            <div className="grid grid-cols-[auto_1fr] grid-rows-96 relative pt-3">
                {/* --- Column 1: Hour Markers --- */}
                {hours.map((hour, i) => (
                    <div
                        key={i}
                        className="row-span-4 text-end pr-2 -mt-3 text-xs text-gray-500"
                        style={{ gridRowStart: i * 4 + 1 }}
                    >
                       {hour}
                    </div>
                ))}

                {/* --- Column 2: Grid Lines --- */}
                {Array.from({ length: 96 }).map((_, index) => (
                    <div
                        key={index}
                        className={`h-5 border-r ${ index % 4 === 0 ? 'border-t' : ''}`}
                    ></div>
                ))}

                {/* --- Render Events on the Grid --- */}
                {events.map((event, i) => {
                    const { gridRow } = getEventGridPosition(event.start, event.end);
                    return (
                        <div
                            key={i}
                            className={`absolute w-full p-2 rounded-lg text-xs mx-1 ${event.color}`}
                            style={{
                                gridColumnStart: 2,
                                gridRow: gridRow,
                            }}
                        >
                            <p className="font-bold">{event.title}</p>
                            <p>{format(event.start, 'h:mm a')} - {format(event.end, 'h:mm a')}</p>
                        </div>
                    );
                })}
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    );
}