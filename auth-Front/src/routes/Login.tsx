import DefaultLayout from "../layout/DefaultLayout"
import {useState} from "react"
import {useAuth} from "../auth/AuthProvider"
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constanst";
import type { AuthResponseError } from "../types/types";

export default function Login(){

    const [username,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const authContext = useAuth()
    const [errorResponse,setErrorResponse] = useState("")
    const goTo = useNavigate()

    if(authContext.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {e.preventDefault()
    
        try{
            const response = await fetch(`${API_URL}/login`, {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({username,password})
            })
            if(response.ok){
                console.log("User Logged succesfully")
                setErrorResponse("")
                goTo("/") 
            }else{
                console.log("Something went wrong")
                const json = (await response.json()) as AuthResponseError 
                setErrorResponse(json.body.error)
            }
            }
        catch(error){
            console.log(error)
        }
    }
    

    return (
        <DefaultLayout>
        <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Username</label>
        <input type="text" value={username} onChange={e=>{setUserName(e.target.value)}}/>

        <label>Password</label>
        <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>

        <button>Login</button>
        </form>
        </DefaultLayout>
    )
}