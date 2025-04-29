import { makeRequest } from "./apiService";
import {
  AllPosts,
  AllPostsFolowers,
  ApiResponse,
  Post,
  PostCreationRequest,
} from "../types/postTypes";

//FETCH: all posts
export const getPosts = (): Promise<ApiResponse<AllPosts[]>> => {
  return makeRequest<AllPosts[]>(`posts`, "GET");
};

//FETCH: all posts for folowers
export const getFollowerPosts = (
  userId: Number
): Promise<ApiResponse<AllPostsFolowers[]>> => {
  return makeRequest<AllPostsFolowers[]>(`feed/${userId}`, "GET");
};

//FETCH: all posts for folowers
export const deletePost = (postId: Number) => {
  return makeRequest(`posts/${postId}`, "DELETE");
};

//FETCH: a single post by ID
export const getPostById = (id: Number): Promise<ApiResponse<Post>> => {
  if (!id) {
    throw new Error("No id provided");
  }
  return makeRequest<Post>(`posts/${id}`, "GET");
};

//CREATE: new post
export const createPost = (
  postData: Partial<PostCreationRequest>
): Promise<ApiResponse<Post>> => {
  if (!postData) {
    throw new Error(
      "Post data is required to CREATE a new post. Please enter valid post data."
    );
  }

  return makeRequest<Post>("posts/save", "POST", postData);
};

//UPDATE: exisitng post

//DELETE: existing post
