import { makeRequest } from "./apiService"
import { ApiResponse, User, UserId, UserCreationRequest } from "../types/userTypes"

//GET a list of all users:
export const getUsers = (): Promise<ApiResponse<User[]>> => {
    return makeRequest<User[]>('users', 'GET')
}

//GET an existing user by ID:
export const getUserById = (
    userId?: UserId
): Promise<ApiResponse<User>> => {
    if (!userId) {
        throw new Error('User ID is required to GET a user.')
    }

    //Unbrands the UserId type 
    const rawUserId: number = userId as number
    return makeRequest<User>(`users/${rawUserId}`, 'GET')
}

//CREATE a new user based on user defined data:
export const createUser = (
    user?: UserCreationRequest
): Promise<ApiResponse<User>> => {
    
    if (!user) {
        throw new Error('User data is required to CREATE a new user. PLease enter valid user data.')
    }
    
    return makeRequest<User, UserCreationRequest>('users/save', 'POST', user)
}

//UPDATE an existing user by ID:
export const updateUser = (
    userId?: UserId,
    user?: Partial<UserCreationRequest>                
): Promise<ApiResponse<User>> => {

    if (!userId) {
        throw new Error('User ID is required to UPDATE a user.')
    }
    if (!user) {
        throw new Error('In order to update a user, user data is required.')
    }

    //Unbrands the UserId type 
    const rawUserId: number = userId as number
    return makeRequest<User, Partial<UserCreationRequest>>(`users/update/${rawUserId}`, 'PUT', user)
}

//DELETE an existing user by ID:
export const deleteUser = (
    userId?: UserId 
): Promise<ApiResponse<User>> => {

    if (!userId) {
        throw new Error('User ID is required to DELETE a user.')
    }

    //Unbrands the UserId type 
    const rawUserId: number = userId as number
    return makeRequest<User>(`users/delete/${rawUserId.toString()}`, 'DELETE')
}