import { makeRequest } from "./apiService";
import { ApiResponse, Post, PostCreationRequest } from "../types/postTypes";

//FETCH: all posts
export const getPosts = (): Promise<ApiResponse<Post>> => {
return makeRequest<Post>(`posts`, 'GET');
};

//FETCH: a single post by ID
export const getPostById = (
  id: Number
): Promise<ApiResponse<Post>> => {

if (!id) {
  throw new Error('No id provided')
}
return makeRequest<Post>(`posts/${id}`, 'GET');
};

//CREATE: new post
export const createPost = (
  postData: Partial<PostCreationRequest>
): Promise<ApiResponse<Post>> => {
  if (!postData) {
    throw new Error('Post data is required to CREATE a new post. Please enter valid post data.');
  }

  return makeRequest<Post>('posts/save', 'POST', postData);
};

//UPDATE: exisitng post

//DELETE: existing post