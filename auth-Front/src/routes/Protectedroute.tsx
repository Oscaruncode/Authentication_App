import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function Protectedroute(){
    const auth = useAuth();
    return auth.isAuthenticated? <Outlet/>: <Navigate to="/"/>
}