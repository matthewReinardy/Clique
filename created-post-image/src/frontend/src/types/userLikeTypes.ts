import { PostId } from './postTypes'
import { UserId } from './userTypes'

export type LikeId = number & {__brand: 'LikeId'}

export interface UserLike {
    id: LikeId,
    createdAt: string,
    type: 'COMMENT' | 'POST',
    postId: PostId,
    userId: UserId,
}