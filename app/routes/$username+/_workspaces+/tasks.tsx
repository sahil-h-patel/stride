import { LoaderFunctionArgs, useLoaderData } from "react-router";
import {Task, TaskSchema} from "~/components/task";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { requireUserId } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma";

export async function loader({ request }: LoaderFunctionArgs) {
    const userId = await requireUserId(request);

    // 1. Define the fields you need from the database
    const selectFields = {
        id: true,
        title: true, // Select the original field name
        dueDate: true,
        updatedAt: true,
        priority: true,
        tags: true
    };

    // 2. Fetch all three lists concurrently for efficiency
    const [notStartedTasks, inProgressTasks, completedTasks] = await Promise.all([
        prisma.task.findMany({ where: { userId, status: 'NOT_STARTED' }, select: selectFields }),
        prisma.task.findMany({ where: { userId, status: 'IN_PROGRESS' }, select: selectFields }),
        prisma.task.findMany({ where: { userId, status: 'COMPLETED' }, select: selectFields })
    ]);

    return { notStartedTasks, inProgressTasks, completedTasks };
}

export default function TaskView() {
    const { notStartedTasks, inProgressTasks, completedTasks } = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-row w-full h-screen">
            {/* --- NOT STARTED COLUMN --- */}
            <div className="flex flex-col flex-1 border-r overflow-hidden"> 
                <div className="sticky top-0 z-10 p-2 border-b w-full bg-red-400/30 backdrop-blur-sm">
                    <div className="p-4 rounded-full w-fit bg-red-400/60">
                        <h1 className="text-md text-secondary font-medium">Not Started</h1>
                    </div>
                </div> 
                <ScrollArea className="w-full p-4 h-full">
                    <div className="flex flex-col gap-4 px-3">
                        {notStartedTasks.map((task: TaskSchema, index: number) => (
                            <Task key={index} {...task}></Task>
                        ))}  
                    </div>
                    <ScrollBar orientation="vertical"/>
                </ScrollArea>
            </div>

            {/* --- IN PROGRESS COLUMN --- */}
            <div className="flex flex-col flex-1 border-r overflow-hidden"> 
                <div className="sticky top-0 z-10 p-2 border-b w-full bg-yellow-400/30 backdrop-blur-sm">
                    <div className="p-4  rounded-full w-fit bg-yellow-400/60">
                        <h1 className="text-md text-secondary">In Progress</h1>
                    </div>
                </div>   
                <ScrollArea className="w-full p-4 h-full">
                    <div className="flex flex-col gap-4 px-3">
                        {inProgressTasks.map((task: TaskSchema, index: number) => (
                            <Task key={index} {...task}></Task>
                        ))}  
                    </div>
                    <ScrollBar orientation="vertical"/>
                </ScrollArea> 
            </div>

            {/* --- COMPLETED COLUMN --- */}
            <div className="flex flex-col flex-1 overflow-hidden"> 
                <div className="sticky top-0 z-10 p-2 border-b w-full bg-green-400/30 backdrop-blur-sm">
                    <div className="p-4 rounded-full w-fit bg-green-400/60">
                        <h1 className="text-md text-secondary">Completed</h1>
                    </div>
                </div>
                <ScrollArea className="w-full p-4 h-full">
                    <div className="flex flex-col gap-4 px-3">
                        {completedTasks.map((task: TaskSchema, index: number) => (
                            <Task key={index} {...task}></Task>
                        ))}  
                    </div>
                    <ScrollBar orientation="vertical"/>
                </ScrollArea>       
            </div>
        </div>
    )
}
