import { User } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "react-router";

// A secret string used to sign the cookie.
// You should change this to a long, random string and store it in your .env file
const sessionSecret = process.env.SESSION_SECRET || "SUPER_SECRET_STRING_FOR_DEV";
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

// 1. Create the session storage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "stride_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

// 2. A helper function to get the user ID from the session cookie
export async function getUser(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const user = session.get("user");
  if (!user || typeof user !== "object" || !("id" in user)) return null;
  return user as User;
}

// 3. A helper function to protect routes that require a logged-in user
export async function requireUserId(request: Request) {
  const user: User | null = await getUser(request);
  if (!user) {
    throw redirect("/login");
  }
  return user.id;
}

// 4. A helper function to handle the login process
export async function createUserSession(user: User, redirectTo: string) {
  const session = await sessionStorage.getSession();
  console.log("createUserSession:",user)
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}
