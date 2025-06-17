import { ActionFunctionArgs } from "@remix-run/node";
import bcrypt from "bcrypt";
import SignUpForm from "./signup-form"
import { prisma } from "~/lib/prisma";
import { z } from "zod";
import { redirect } from "@remix-run/react";

const SignupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const fields = Object.fromEntries(formData);
  const result = SignupSchema.safeParse(fields);
  if (!result.success) {
    return ({ errors: result.error.flatten().fieldErrors,  status: 400 });
  }

  const { email, username, password } = result.data;
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });

  if (existingUser) {
    return (
      {
        errors: {
          form: "A user with this email or username already exists.",
        },
        status: 400 }
    );
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await prisma.user.create({
    data:{
      email: email,
      username: username,
      password: hashedPassword
    }
  })
  return redirect("/login");
}
export default function SignUpPage() {
  // const actionData = useActionData<typeof action>();
  // return <SignUpForm errors={actionData?.errors}/>;
  return <SignUpForm />;
}