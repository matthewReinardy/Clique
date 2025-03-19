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
    website: string,
    //role: 'USER' | 'BUSINESS' | 'ADMIN', //Not included in the DB User table as of 3/18/25
}

export interface UserCreationRequest {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    phoneNumber: string,
    email: string,
    bio: string,
    website: string,
    // profilePicture: string //Not supported as of 3/18/25
}

export interface UserUpdateRequest {
    firstName?: string,
    username?: string,
    phoneNumber?: string,
    email?: string,
    bio?: string,
    website?: string,
    // profilePicture: string //Not supported as of 3/18/25
}