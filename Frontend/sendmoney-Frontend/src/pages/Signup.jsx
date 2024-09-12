import axios from "axios";
import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
   const [firstName, SetfirstName] = useState("");
   const [lastName, SetlastName] = useState("");
   const [username, SetUsername] = useState("");
   const [password, SetPassword] = useState("");
  
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 shadow-xl">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange = {(e) => {SetfirstName(e.target.value)}} placeholder="John" label={"First Name"} />
        <InputBox onChange = {(e) => {SetlastName(e.target.value)}}  placeholder="Doe" label={"Last Name"} />
        <InputBox onChange = {(e) => {SetUsername(e.target.value)}}  placeholder="siddharth@gmail.com" label={"Email"} />
        <InputBox onChange = {(e) => {SetPassword(e.target.value)}}  placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={ async ()=>{
            const response = await axios.post("http://localhost:3001/api/v1/user/signup", {
              username: username,
              firstName: firstName,
              lastName: lastName,
              password: password
            });
             localStorage.setItem("token", response.data.token) 
              // this for the persistent login on the browser for all the further req
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}