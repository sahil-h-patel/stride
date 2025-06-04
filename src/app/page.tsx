import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const style = { 
        backgroundImage: "url('./bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
    };

  return (
    <div style={style} className="flex flex-col">
      <div className="flex flex-row  justify-between px-6 pt-6">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <Button>Sign in</Button>
      </div>
      <div className="flex flex-col text-center items-center pt-44 w-2xl mx-auto gap-3">
        <h1 className="text-6xl">The <span className="bg-gradient-to-r from-[#A235F7] via-[#2E64E8] to-[#0DB3E4] text-transparent bg-clip-text">AI Productivity App</span> that adapts to you</h1>
        <h2 className="text-2xl">An intiutive and user-centered approach to make productivity feel like play. Let AI do the heavy work—so you can stay in flow.</h2>
          <Button className="rounded-lg bg-gradient-to-r from-[#A235F7] via-[#2E64E8] to-[#0DB3E4] hover:from-[#9f2cf6] hover:via-[#285ee7] hover:to-[#069bc8]">
            Try Stride for Free
          </Button>
      </div>
    </div>
  );
}
