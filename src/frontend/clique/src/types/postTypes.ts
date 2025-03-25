import { UserId } from './userTypes'

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