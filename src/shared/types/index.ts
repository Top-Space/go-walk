export const UserRoles = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]

export interface UserType {
    email: string
    id: string
    role: UserRole
}
