import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="gap-3 flex flex-col items-center">
            <Image 
                src="/logo.png"
                alt=""
                width={75}
                height={75}
            />  
            <p>Sign in to Stride</p>
            <Card className="w-100">
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Username</Label>
                                <Input id="name" placeholder="Username"></Input>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Password"></Input>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="bg-secondary">Login</Button>
                </CardFooter>
            </Card>
            <Card className="w-100 items-center">
                <CardContent>
                    <p>New to Stride? <a className="text-primary underline" href="/register">Create an account</a> </p>
                </CardContent>
           </Card>
        </div>
        </div>
    )
}