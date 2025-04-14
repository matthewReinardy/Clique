import { UserId } from './userTypes'

//ApiResponse type for user data:
export interface ApiResponse<T> { 
    data: T
    message?: string
}

export type PostId = number & {__brand: 'PostId'}

export interface Post {
    id: PostId,
    caption: string,
    tags: string;
    location: string;
    createdAt: Date,
    mediaUrl: string,
    shareCount: number,
    authorId: UserId,
    mediaFileName: string
}

export interface PostCreationRequest {
    caption: string;
    tags: string;
    location: string;
    authorId: string;
}