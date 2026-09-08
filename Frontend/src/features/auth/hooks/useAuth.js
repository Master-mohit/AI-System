import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from '../services/auth.api'


export const useAth = () => {
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context
}