import { Form, redirect, ActionFunctionArgs } from "react-router";
import bcrypt from "bcrypt";
import { prisma } from "~/lib/prisma";
import { z } from "zod";
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { SiNotion, SiGoogle } from "react-icons/si";

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
  return (
     <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign up</CardTitle>
          <CardDescription>
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    name="username"
                    id="username"
                    type="username"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input                     
                    name="password"
                    id="password" 
                    type="password" 
                    required 
                  />
                </div>
                <div className="flex flex-col gap-4">
                <Button 
                  name="_action"
                  value="signup"
                  type="submit" 
                  className="w-full">
                  Sign up
                </Button>
                <Button variant="outline" className="w-full">
                  <SiNotion/>
                  Sign up with Notion
                </Button>
                <Button variant="outline" className="w-full">
                  <SiGoogle/>
                  Sign up with Google
                </Button>
              </div>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
            Log in
        </a>
        </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="/">Terms of Service</a>{" "}
        and <a href="/">Privacy Policy</a>.
      </div>
    </div>
  )
}