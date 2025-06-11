import { cn } from "~/lib/utils"
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

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  return (
     <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign up</CardTitle>
          <CardDescription>
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="flex flex-col gap-4">
                <Button type="submit" className="w-full">
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
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
            Log in
        </a>
        </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
};
