import { ApiResponse } from "../types/userTypes"
import { User } from "../types/userTypes"
import { Admin } from "../types/adminTypes"

type Role = 'user' | 'business' | 'admin'

export const loginAsRole = async (
    role: Role
): Promise<ApiResponse<User | Admin>> => {
    const roleToUsernameMap: Record<Role, string> = {
        user: "janesmithXOXO",        
        business: "SunshineJewelryCo.LV",
        admin: "Administrator",
    }

    const username = roleToUsernameMap[role]

    const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    })

    const data = await response.json()

    return data
}
