import { makeRequest } from "./apiService";
import { ApiResponse, Post, PostCreationRequest } from "../types/postTypes";

//FETCH: all posts

//FETCH: a single post by ID

//CREATE: new post
export const createPost = (
    postData: PostCreationRequest
  ): Promise<ApiResponse<Post>> => {
    return makeRequest<Post>('posts/save', 'POST', postData);
  };

//UPDATE: exisitng post

//DELETE: existing post