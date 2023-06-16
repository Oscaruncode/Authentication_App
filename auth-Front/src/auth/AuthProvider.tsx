import { useContext,createContext, useState,useEffect } from "react";
import type { AuthResponse } from "../types/types";

interface AuthProviderProps{
    children: React.ReactNode;
}

const authContext = createContext({

    isAuthenticated:false,
    getAccessToken: ()=>{},
    saveUser: (userData: AuthResponse) => {},
    getRefreshToken:()=>{},
}
)
export function AuthProvider({children} : AuthProviderProps){

    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [accessToken,setAccessToken] = useState<string>("")

    function getAccessToken (){
        return accessToken
    }
    function getRefreshToken():string|null{
        const token = localStorage.getItem("Token") || null
        if(token){
            const {refreshToken} = JSON.parse(token)
            return refreshToken
        }
        return null
    }

    function saveUser(userData : AuthResponse){
        setAccessToken(userData.body.accessToken)
        localStorage.setItem("Token",JSON.stringify(userData.body.refreshToken) )
        setIsAuthenticated(true)
    }
    return <authContext.Provider value={{isAuthenticated, getAccessToken,saveUser, getRefreshToken }}> 
    {children} 
    </authContext.Provider>
}

export const useAuth = () => useContext(authContext);