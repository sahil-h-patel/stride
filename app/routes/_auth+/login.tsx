import { ActionFunctionArgs, type MetaFunction } from "react-router";
import bcrypt from "bcrypt";
import { prisma } from "~/lib/prisma";
import { createUserSession } from "~/lib/auth.server";
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
import { Form } from "react-router";

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
  
  return createUserSession(user, `/${user.username}/calendar`);
}

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Notion or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <SiNotion/>
                  Login with Notion
                </Button>
                <Button variant="outline" className="w-full">
                  <SiGoogle/>
                  Login with Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="identifier">Username or Email</Label>
                  <Input
                    name="identifier"
                    id="identifier"
                    type="text"
                    placeholder=""
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input 
                    name="password"
                    id="password" 
                    type="password" 
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="/">Terms of Service</a>{" "}
        and <a href="/">Privacy Policy</a>.
      </div>
    </div>
  );
}
