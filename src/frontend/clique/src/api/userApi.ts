import { makeRequest } from "./apiService"
import { ApiResponse, User } from "../types/userTypes"

//Retrieves a list of all users:
export const fetchUsers = (): Promise<ApiResponse<User[]>> => {
    return makeRequest<User[]>('users', 'GET')
}