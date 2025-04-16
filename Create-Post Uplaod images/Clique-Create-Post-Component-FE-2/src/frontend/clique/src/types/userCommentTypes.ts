import { PostId } from './postTypes'
import { UserId } from './userTypes'

export type CommentId = number & {__brand: 'CommentId'}

export interface UserComment {
    id: CommentId,
    content: string,
    createdAt: string,
    authorId: UserId,
    postId: PostId,
}