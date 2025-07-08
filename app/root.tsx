import { useLoaderData, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { type LoaderFunctionArgs, type LinksFunction } from "react-router";
import styles from "~/tailwind.css?url"
import { getUser } from "~/lib/auth.server"; // Your helper function

// The root loader runs on every request
export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUser(request);
  // Return the user object (or null if not logged in)
  return { user };
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Space+Mono:wght@400;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App(){
  const { user } = useLoaderData<typeof loader>();

  return (
    <Outlet context={{ user }}/>          
  )
}
