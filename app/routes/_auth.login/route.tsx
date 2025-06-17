import {
  ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import bcrypt from "bcrypt";
import { LoginForm } from "./login-form";
import { prisma } from "~/lib/prisma";
import { createUserSession } from "~/lib/auth.server"; // 1. Import the session helper

export const meta: MetaFunction = () => {
  return [{ title: "Login to Stride" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const fields = Object.fromEntries(formData);
  const { username, password } = fields;

  if (typeof username !== "string" || typeof password !== "string") {
    return ({ error: "Invalid form submission" , status: 400 });
  }
  // Find the user by their email
  const user = await prisma.user.findUnique({ where: { username } });

  // Check if the user exists and the password is correct
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return ({ error: "Invalid username or password" , status: 400 });
  }
  // 2. On successful login, create the user session and redirect
  return createUserSession(user.id, "/dashboard");
}

export default function LoginPage() {
  return <LoginForm />;
}
