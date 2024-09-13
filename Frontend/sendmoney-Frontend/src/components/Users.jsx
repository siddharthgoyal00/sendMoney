

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { Button } from "./Button"
import axios from "axios";
export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filtered , setFiltered] = useState("");
     useEffect( ()=>{
        axios.get("http://localhost:3001/api/v1/user/bulk?filtered=" + filtered)
        .then(response => {
             setUsers(response.data.user)
        })
     }, [filtered])
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange = {(e)=>{
                setFiltered(e.target.value)
            }}   type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-blue-800 flex justify-center mt-1 mr-2 text-white">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e)=>{
            navigate("/MoneyTransfer?id=" + user._id +  "&name=" + user.firstName)
            }} label={"Send Money"} />
        </div>
    </div>
}
