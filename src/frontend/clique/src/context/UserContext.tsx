import React, {createContext, useContext, useState, useEffect} from 'react'
import { User, UserCreationRequest, UserId } from '../types/userTypes'
import { getUsers, createUser, updateUser, deleteUser, getUserById } from '../api/userApi'

//Context Type
interface UserContextType {
    users: User[],
    loading: boolean,
    error: string | null,
    fetchAllUsers: () => Promise<void>,
    fetchUserById: (userId: UserId) => Promise<User | null>,
    addUser: (user: UserCreationRequest) => Promise<void>,
    editUser: (userId: UserId, user: Partial<UserCreationRequest>) => Promise<void>,
    removeUser: (userId: UserId) => Promise<void>,
}

//Default context STATE
const defaultContext: UserContextType = {
    users: [],
    loading: false,
    error: null,
    fetchAllUsers: async () => {},
    fetchUserById: async () => Promise.resolve(null),
    addUser: async () => {},
    editUser: async () => {},
    removeUser: async () => {},
}

const UserContext = createContext<UserContextType>(defaultContext)


export function UserProvider({children} : {children: React.ReactNode}) { //Type is anything that can that be rendered in React

    //State Hooks
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    //FETCH users:
    const fetchAllUsers = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await getUsers()
            setUsers(response.data)
        } catch {
            setError('Error fetching users.')
        } finally {
            setLoading(false)
        }
    }

    //FETCH user by ID:
    const fetchUserById = async (userId: UserId): Promise<User | null> => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await getUserById(userId);
            return response.data; //Return the fetched user
        } catch {
            setError('Error fetching user by ID');
            return null;
        } finally {
            setLoading(false);
        }
    };

    //ADD user:
    const addUser = async (user: UserCreationRequest) => {
        setLoading(true)

        try {
            const response = await createUser(user)
            setUsers(prevUsers => [...prevUsers, response.data])
        } catch {
            setError('Error creating user')
        } finally {
            setLoading(false)
        }
    }

    //EDIT user:
    const editUser = async (userId: UserId, user: Partial<UserCreationRequest>) => {
        setLoading(true)

        try {
            const response = await updateUser(userId, user)
            setUsers(prevUsers => 
                prevUsers.map(u => (u.id === userId ? response.data : u))
            )
        } catch {
            setError('Error updating user')
        } finally {
            setLoading(false)
        }
    }

    //REMOVE user:
    const removeUser = async (userId: UserId) => {
        setLoading(true)

        try {
            await deleteUser(userId)
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
        } catch {
            setError('Error removing user')
        } finally {
            setLoading(false)
        }
    }

    //Fetch users on initial load
    useEffect(() => {
        fetchAllUsers()
    }, []); 

    return (
        
        //All child components consuming this context will have access to the data in this provider
        <UserContext.Provider value={{users, loading, error, fetchAllUsers, fetchUserById, addUser, editUser, removeUser}}>
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