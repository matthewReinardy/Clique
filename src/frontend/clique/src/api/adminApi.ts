import { makeRequest } from "./apiService"
import { ApiResponse } from "../types/userTypes"
import { Admin } from "../types/adminTypes"

export const getAdminById = (AdminId: number): Promise<ApiResponse<Admin>> => {
    return makeRequest<Admin>(`admin/${AdminId}`, 'GET')
}