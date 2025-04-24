import { UserId } from './userTypes'

//ApiResponse type for user data:
export interface ApiResponse<T> { 
    data: T
    message?: string
}

export type PostId = number & {__brand: 'PostId'}

export interface Post {
    id: PostId,
    content: string,
    createdAt: string,
    mediaUrl: string,
    shareCount: number,
    authorId: UserId,
    mediaFileName: string
}

export interface PostCreationRequest {
    content: string;
    mediaFileName: string;
    authorId: UserId;
}