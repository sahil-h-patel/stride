import { Button } from '~/components/ui/button';
import logo from '../../public/logo.png'

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-row justify-between px-6 pt-6">
        <img src={logo} alt="Logo" width={40} height={40} />
        <Button>Sign in</Button>
      </div>
      <div className="flex flex-col text-center items-center w-6/12 mx-auto gap-3">
        <h1 className="text-6xl text-wrap">The <span className="bg-gradient-to-r from-[#759bbd] to-[#c895ea] text-transparent bg-clip-text">AI Productivity App</span> that adapts to you</h1>
        <h2 className="text-3xl text-wrap">An intiutive and user-centered approach to make productivity feel like play. Let AI do the heavy work—so you can stay in flow.</h2>
          <Button className="rounded-lg bg-gradient-to-r from-[#759bbd] to-[#c895ea] hover:from-[#5d7c97] hover:to-[#9e75ba]">
            Try Stride for Free
          </Button>
      </div>
    </div>
  );
}
