
import {Heading} from "../components/Heading.jsx";
import {Button} from "../components/Button.jsx";
import {InputBox} from "../components/InputBox.jsx";
import {SubHeading} from "../components/SubHeading.jsx";
import {BottomWarning} from "../components/BottomWarning.jsx";
export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-xl">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your Email and Password"} />
        <InputBox placeholder="siddharht@gmail.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}