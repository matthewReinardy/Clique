import React, {createContext, useContext, useState, useEffect} from 'react'
import { User } from '../types/userTypes'
import { fetchUsers } from '../api/userApi'

//Context Type
interface UserContextType {

    users: User[],
    loading: boolean,
    error: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)


export function UserProvider({children} : {children: React.ReactNode}) { //Type is anything that can that be rendered in React

    //Hooks
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const loadUsers = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetchUsers()
            setUsers(response.data)
        } catch {
            setError('Error fetching users.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadUsers()
    }, []); 

    return (
        
        //All child components consuming this context will have access to the data in this provider
        <UserContext.Provider value={{users, loading, error}}>
            {children} 
        </UserContext.Provider>
    )
}

//Custom hook to use user context
export function useUserContext() {

    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider!");
    }

    return context
}