import { useContext,createContext, useState,useEffect } from "react";

interface AuthProviderProps{
    children: React.ReactNode;
}

const authContext = createContext({

    isAuthenticated:false,

}
)
export function AuthProvider({children} : AuthProviderProps){

    const [isAuthenticated,setIsAuthenticated] = useState(false)
    return <authContext.Provider value={{isAuthenticated}}> 
    {children} 
    </authContext.Provider>
}

export const useAuth = () => useContext(authContext);