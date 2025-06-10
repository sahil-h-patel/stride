import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
   return (
     <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
       <div className="flex w-full max-w-sm flex-col gap-6">
         <a href="#" className="self-center">
             <img src='/logo.png' alt="Logo" width={40} height={40}/>
         </a>
         <Outlet/>
       </div>
     </div>
   ) 
}