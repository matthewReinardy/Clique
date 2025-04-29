//ApiResponse type for user data:

export type AdminId = number & {__brand: 'AdminId'}

export interface Admin {
    id: AdminId,
    accountType: 'admin',
    email: string,
    password: string,
    username: string,
}