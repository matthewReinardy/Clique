import { PostId } from './postTypes'
import { LikeId } from './userLikeTypes'
import { CommentId } from './userCommentTypes'

//ApiResponse type for user data:
export interface ApiResponse<T> { 
    data: T
    message?: string
}

export type UserId = number & {__brand: 'UserId'}

export interface User {
    id: UserId,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    dateOfBirth: string,
    bio: string,
    location: string,
    isPrivate: boolean,
    isVerified: boolean,
    profilePicture: string,
    accountType: string,
    interests: string[],
    followerCount: number,
    followingCount: number,
    postCount: number,
    posts: Array<PostId>, 
    comments: Array<CommentId>
    userLike: Array<LikeId>
}

export interface UserCreationRequest {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    dateOfBirth: string,
    bio: string,
    location: string,
    isPrivate: boolean,
    isVerified: boolean,
    profilePicture: string,
    accountType: string,
    followerCount: number,
    followingCount: number,
    postCount: number,
}

export const defaultUser: User = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    bio: "",
    location: "",
    isPrivate: false,
    isVerified: false,
    profilePicture: "",
    accountType: "user",
    followerCount: 0,
    followingCount: 0,
    postCount: 0,
}