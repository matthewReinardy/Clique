import { getUserById } from "../api/userApi"
import { getAdminById } from "../api/adminApi"
import { ApiResponse, UserId } from "../types/userTypes"
import { User } from "../types/userTypes"
import { Admin } from "../types/adminTypes"

type Role = 'user' | 'business' | 'admin'

export const loginAsRole = async (
    role: Role
): Promise<ApiResponse<User | Admin>> => {

    const roleToUserIdMap: Record<'user' | 'business', number> = {
        user: 3,
        business: 35,
    }

    const adminId = 1 //Hardcoded for now

    if (role === "admin") {
        return getAdminById(adminId)
    } else {
        return getUserById(roleToUserIdMap[role] as UserId)
    }
}