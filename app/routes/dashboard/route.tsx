import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Calendar, List } from "lucide-react";
import Navbar from "./navbar";
import { prisma } from "~/lib/prisma";
import { requireUserId } from "~/lib/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);

  // Fetch the user from the database, selecting only the fields you need
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, email: true },
  });

  if (!user) {
    // This case should be rare if requireUserId works correctly,
    // but it's good practice to handle it.
    throw new Response("User not found", { status: 404 });
  }

  // Return the user data to the component
  return ({ user });
}

export default function DashboardLayout() {
  const { user } = useLoaderData<typeof loader>();

  return ( 
         <div> 
            <Navbar username={user.username} email={user.email}/>
            <div className="flex flex-row h-[93vh]">
                <div className="border-accent mt-2 border-r-1 w-[3vw]">
                    <div className="flex flex-col gap-2 ml-0.5">
                        <Link className="p-2 w-max rounded-full hover:bg-accent items-center" to="/dashboard/tasks"><List className=""/></Link>
                        <Link className="p-2 w-max rounded-full hover:bg-accent items-center" to="/dashboard/calendar"><Calendar/></Link>
                    </div>
                </div>
                <Outlet/>
            </div>    
        </div>
  );
}