export interface BaseUser {
    email: string;
    username: string;
}

export interface UserCredentials extends BaseUser {
    token: string;
}
export interface UserLogin extends Omit<BaseUser, 'username'>{
    password: string;
}
export interface User extends BaseUser {
    token: string;
    bio: string;
    image: string;
}
export interface UserResponse {
    user: User;
}
