import React, {createContext, useContext, useState, useEffect} from 'react'

//User Type
interface User {    
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    //password: string,
    //phoneNumber: string,
    //dateOfBirth: string,
    //bio: string,
    //location: string,
    //isPrivate: boolean,
    //isVerified: boolean,
    profilePicture: string,
    accountType: string,
    //interests: string[],
    followerCount: number,
    followingCount: number,
    postCount: number,
    //posts: Array<Post>,
    //comments: Array<Comment>
    //userLike: Array<Like>

}

//Context Type
interface UserContextType {

    users: User[],
    loading: boolean,
    error: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

//Mock User data
const mockUsers: User[] = [

    {id: 1, firstName: 'Lily', lastName: 'Broman', email: 'lilybroman@example.com', profilePicture: './assets/temp-profile-pics/lily-profile-pic.png', accountType: 'user', followerCount: 20, followingCount: 51, postCount: 2},
    {id: 2, firstName: 'Ben', lastName: 'Broman', email: 'benbroman@example.com', profilePicture: './assets/temp-profile-pics/lily-profile-pic.png', accountType: 'user', followerCount: 401, followingCount: 20, postCount: 15},
    {id: 1, firstName: 'Mya', lastName: 'Broman', email: 'myabroman@example.com', profilePicture: './assets/temp-profile-pics/lily-profile-pic.png', accountType: 'user', followerCount: 99, followingCount: 72, postCount: 10},
    {id: 1, firstName: 'Sarah', lastName: 'Broman', email: 'sarahbroman@example.com', profilePicture: './assets/temp-profile-pics/lily-profile-pic.png', accountType: 'user', followerCount: 52, followingCount: 23, postCount: 22},
    {id: 1, firstName: 'Peter', lastName: 'Cronen', email: 'petercronen@example.com', profilePicture: './assets/temp-profile-pics/lily-profile-pic.png', accountType: 'user', followerCount: 553, followingCount: 3, postCount: 4}
]

export function UserProvider({children} : {children: React.ReactNode}) { //Type is anything can that be rendered in React

    //Hooks
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        const fetchMockData = async () => {

            try {
                setLoading(true)
                setError(null)

                //Simulates API call delay
                await new Promise((resolve) => setTimeout(resolve, 1000)) 
                setUsers(mockUsers)
            } catch {
                setError("Failed to load users.")
            } finally {
                setLoading(false)
            }
        }

        fetchMockData();
    }, [])

    return (
        
        //All child components consuming this context will have access to the data in this provider
        <UserContext.Provider value={{users, loading, error}}>
            {children} 
        </UserContext.Provider>
    )
}

//Custom hook to use user context
export function useUser() {

    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider!");
    }

    return context
}