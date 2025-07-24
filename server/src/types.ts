export enum Roles{
    USER = "user",
    EMPLOYEE= "employee",
    ADMIN= "admin"
}

export interface UserInterface {
    _id: Object,
    email: string,
    password: string,
    role: Roles
}