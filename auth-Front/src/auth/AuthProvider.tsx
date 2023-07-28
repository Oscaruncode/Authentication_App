/**
 * PROVIDER, CONTEXT AND LOGIN LOGIC
 * FUNC AuthProvider
 * @param {React.ReactNode} {children} - need children react components
 * @returns {Provider} Return provider with context for children
 */

import { useContext,createContext, useState,useEffect } from "react";
import type { AuthResponse , User} from "../types/types";
import requestNewAccessToken from "./requestNewAccessToken";
import retrieveUserInfo from "./retrieveUserInfo";

//Types / Interface
interface AuthProviderProps{
    children: React.ReactNode;
}

//Context APP
const authContext = createContext({
    isAuthenticated:false,
    getAccessToken: ()=>{},
    saveUser: (userData: AuthResponse) => {},
    getRefreshToken:()=>{},
    getUser: () => ({} as User | undefined),
    signout: () => {},
    setAccessTokenAndRefreshToken: (
        _accessToken: string,
        _refreshToken: string
      ) => {},
})

export function AuthProvider({children} : AuthProviderProps){

    //State
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [accessToken,setAccessToken] = useState<string>("")
    const [user, setUser] = useState<User | undefined>();
    const [isloading, setIsLoading] = useState(true);

    //getter
    function getUser(): User | undefined {
        return user;
      }

    //getter
    function getAccessToken (){
        return accessToken
    }

   //getter from localStorage
    function getRefreshToken():string|null{
        const token = localStorage.getItem("Token") || null
        if(token){
            try{
            const {refreshToken} = JSON.parse(token)
            return refreshToken
            }
            catch(error){console.log("Error parsing refresh token ", error)}
        }
        return null
    }

    //POST- to back end and get a new access token
    async function getNewAccessToken(refreshToken: string) {
        const token = await requestNewAccessToken(refreshToken);
        if (token) {
          return token;
        }
      }

    //Set state - Keep user info in state
    function saveUser(userData : AuthResponse){
        setAccessTokenAndRefreshToken(
            userData.body.accessToken,
            userData.body.refreshToken
          );
          setUser(userData.body.user);
          setIsAuthenticated(true);
    }

    //set state and local storage
    function setAccessTokenAndRefreshToken(accessToken: string,refreshToken: string){
        setAccessToken(accessToken)
        localStorage.setItem("Token",JSON.stringify({refreshToken})) //Set refresh token
    }

    //Run at start, function for autologgin in cases that have : A) AccesToken B)RefreshToken (no expired)
    async function checkAuth() {
        try{
            if(!!accessToken){
                //Have an access token
                const userInfo = await retrieveUserInfo(accessToken);
                setUser(userInfo);
                setAccessToken(accessToken);
                setIsAuthenticated(true);
                setIsLoading(false);
            }
            else{
            //Haven´t access token in status
                const token = localStorage.getItem("Token")
                //Check if exist a token in storage, if yes get a new token from back, if not pass to login
                if(token){
                    const refreshToken = JSON.parse(token).refreshToken;
                    //get new token from back with refresh token
                    getNewAccessToken(refreshToken).then(
                        async(newToken)=>{
                            const userInfo= await retrieveUserInfo(newToken!)
                            setUser(userInfo)
                            setAccessToken(newToken!)
                            setIsAuthenticated(true)
                            setIsLoading(false)
                        }
                    ).catch((error)=>{console.log("Error in CheckAuthError in GetNewAccessToken:",error)})

                }else{
                    setIsLoading(false)
                }
            }
        }catch(error){
            console.log("CheckAuthError: ", error)
        }

    }

    //setter state (Finish session)
    function signout() {
        localStorage.removeItem("Token");
        setAccessToken("");
        setUser(undefined);
        setIsAuthenticated(false);
      }

    //React Effect at start
      useEffect(()=>{checkAuth()},[])

    //Return provider, change loading for component**
    return <authContext.Provider value={{isAuthenticated, getAccessToken,saveUser, getRefreshToken,signout,getUser,setAccessTokenAndRefreshToken }}> 
    {isloading ? <div>Loading...</div> : children}
    </authContext.Provider>
}

export const useAuth = () => useContext(authContext);