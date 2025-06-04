import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FaGoogle } from "react-icons/fa";
import { SiNotion } from "react-icons/si";
export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="gap-3 flex flex-col items-center">
            <Image 
                src="/logo.png"
                alt=""
                width={75}
                height={75}
            />  
            <Separator className="my-2"></Separator>
            <div className="flex-row flex gap-2">
                <Button>Sign up with Google <FaGoogle/></Button>
                <Button>Sign up with Notion <SiNotion/></Button>
            </div>
            <div className="flex flex-row w-full gap-3">
                <Separator className="my-2 flex-1"/>
                <span className="text-sm text-muted-foreground">or</span>
                <Separator className="my-2 flex-1"/>
            </div>
            <h1><b>Sign up with your email address</b></h1>
            <Card className="w-100">
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Username</Label>
                                <Input id="name" placeholder="Username"></Input>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Password"></Input>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Password"></Input>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="bg-secondary">Register</Button>
                </CardFooter>
            </Card>
        </div>
        </div>
    )
}