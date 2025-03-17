import React, {createContext, useContext, useState, useEffect} from 'react'

//User Type
interface User {    
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    //password: string,
    //phoneNumber: string,
    //dateOfBirth: string,
    bio: string,
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
    website: string

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

    {id: 1, firstName: 'Lily', lastName: 'Broman', username: 'lilybee05', email: 'lilybroman@example.com', bio: 'I love to play volleyball!', profilePicture: '/assets/temp-profile-pics/lily-profile-pic.png', accountType: 'user', followerCount: 20, followingCount: 51, postCount: 2, website: 'https://github.com/matthewReinardy/Clique'},
    {id: 2, firstName: 'Ben', lastName: 'Broman', username: 'bennyboi5', email: 'benbroman@example.com', bio: 'I am a senior software developer.', profilePicture: '/assets/temp-profile-pics/lily-profile-pic.png', accountType: 'user', followerCount: 401, followingCount: 20, postCount: 15, website: 'https://github.com/matthewReinardy/Clique'},
    {id: 3, firstName: 'Mya', lastName: 'Broman', username: 'beesqr95', email: 'myabroman@example.com', bio: 'AVVB, Hammerhead VB', profilePicture: '/assets/temp-profile-pics/lily-profile-pic.png', accountType: 'user', followerCount: 99, followingCount: 72, postCount: 10, website: 'https://github.com/matthewReinardy/Clique'},
    {id: 4, firstName: 'Sarah', lastName: 'Broman', username: 'sarbro3421', email: 'sarahbroman@example.com', bio: 'Self-employed interior designer and mom of 2!', profilePicture: '/assets/temp-profile-pics/lily-profile-pic.png', accountType: 'user', followerCount: 52, followingCount: 23, postCount: 22, website: 'https://github.com/matthewReinardy/Clique'},
    {id: 5, firstName: 'Peter', lastName: 'Cronen', username: 'skill1234', email: 'petercronen@example.com', bio: 'Passion for photography :D', profilePicture: '/assets/temp-profile-pics/lily-profile-pic.png', accountType: 'user', followerCount: 553, followingCount: 3, postCount: 4, website: 'https://github.com/matthewReinardy/Clique'}
]

export function UserProvider({children} : {children: React.ReactNode}) { //Type is anything can that be rendered in React

    //Hooks
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // useEffect(() => {

    //     const fetchMockData = async () => {

    //         try {
    //             setLoading(true)
    //             setError(null)

    //             //Simulates API call delay
    //             await new Promise((resolve) => setTimeout(resolve, 1000)) 
    //             setUsers(mockUsers)
    //         } catch {
    //             setError("Failed to load users.")
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     fetchMockData();
    // }, [])

    useEffect(() => {
        const fetchUsers = async ()=> {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch('http://localhost:8080/users') //Java API

                if (!response.ok) {
                    throw new Error("Failed to fetch users!")
                }

                const data: User[] = await response.json()
                setUsers(data)
            } catch {
                setError("Failed to load users.")
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
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