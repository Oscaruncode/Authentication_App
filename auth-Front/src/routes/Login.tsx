import DefaultLayout from "../layout/DefaultLayout"
import {useState} from "react"
import {useAuth} from "../auth/AuthProvider"
import { Navigate } from "react-router-dom"

export default function Login(){

    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const authContext = useAuth()

    const handleSubmit = () => console.log("hola");
    if(authContext.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }


    return (
        <DefaultLayout>
        <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label>Username</label>
        <input type="text" value={username} onChange={e=>{setUserName(e.target.value)}}/>

        <label>Password</label>
        <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>

        <button>Login</button>
        </form>
        </DefaultLayout>
    )
}