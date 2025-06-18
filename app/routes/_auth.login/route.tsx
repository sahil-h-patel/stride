import {
  ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import bcrypt from "bcrypt";
import { prisma } from "~/lib/prisma";
import { createUserSession } from "~/lib/auth.server";
import { LoginForm } from "./login-form";

export const meta: MetaFunction = () => {
  return [{ title: "Login to Stride" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // Assume the form has an input with name="identifier" for email/username
  const identifier = formData.get("identifier") as string | null;
  const password = formData.get("password") as string | null;

  if (typeof identifier !== "string" || typeof password !== "string") {
    return ({ error: "Invalid form submission", status: 400 });
  }
  // Determine if the identifier is an email or a username
  const isEmail = identifier.includes("@");

  // Build the 'where' clause for the Prisma query
  const where = isEmail ? { email: identifier } : { username: identifier };

  // Find the user by their email OR username
  const user = await prisma.user.findUnique({ where });

  // Check if the user exists and the password is correct
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return (
      { error: "Invalid credentials. Please try again.",
        status: 400 }
    );
  }

  // On successful login, create the user session and redirect to the dashboard
  return createUserSession(user.id, "/dashboard");
}

export default function LoginPage() {
  return <LoginForm />;
}
