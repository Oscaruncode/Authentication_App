import DefaultLayout from "../layout/DefaultLayout"
import {useState} from "react"
import {useAuth} from "../auth/AuthProvider"
import { Navigate } from "react-router-dom";

export default function Signup(){
    
    const [name,setName] = useState("")
    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")

    const authContext = useAuth()
    if(authContext.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }


    const handleSubmit = () => console.log("hola");
    return (
        <DefaultLayout>
        <form className="form" onSubmit={handleSubmit}>
        <h1>Signup</h1>

        <label>Name</label>
        <input type="text" value={name} onChange={e=>{setName(e.target.value)}}/>

        <label>Username</label>
        <input type="text" value={username} onChange={e=>{setUserName(e.target.value)}}/>

        <label>Password</label>
        <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>

        <button>Createuser</button>
        </form>
        </DefaultLayout>
    )
}