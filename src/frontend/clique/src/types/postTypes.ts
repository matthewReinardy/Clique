import { UserId } from "./userTypes";

//ApiResponse type for user data:
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type PostId = number & { __brand: "PostId" };

export interface Author {
  id: number;
  username: string;
}

export interface AllPosts {
  id: number;
  author: Author;
  caption: string;
  createdAt: string;
  likeCount: number;
  location: string;
  image: string;
  tags: string;
  ad: boolean;
}

export interface AllPostsFolowers {
  id: number;
  authorUsername: string;
  caption: string;
  createdAt: string;
  likeCount: number;
  location: string;
  image: string;
  tag: string;
  ad: boolean;
}

export interface Post {
  id: PostId;
  caption: string;
  tags: string;
  location: string;
  createdAt: Date;
  mediaUrl: string;
  shareCount: number;
  authorId: UserId;
  file: string;
}

export interface PostCreationRequest {
  caption: string;
  tags: string;
  location: string;
  authorId: string;
  file: File;
  isAd: boolean;
}
