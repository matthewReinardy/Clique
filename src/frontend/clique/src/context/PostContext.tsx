import React, { createContext, useContext, useState, useEffect } from 'react';
import { createPost as createPostApi } from '../api/postApi';
import { Post, PostCreationRequest } from '../types/postTypes';

//Context Type
interface PostContextType {
    loading: boolean;
    error: string | null;
    handleCreatePost: (postData: PostCreationRequest) => Promise<Post | undefined>;
}

//Default context STATE
const defaultContext: PostContextType = {
    loading: false,
    error: null,
    handleCreatePost: async () => undefined,
}

const PostContext = createContext<PostContextType>(defaultContext);

export function PostProvider({ children }: { children: React.ReactNode }) {

    //State Hooks
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    //FETCH posts:

    //FETCH post by ID:

    //CREATE post:
    const handleCreatePost = async (postData: PostCreationRequest, image: File): Promise<String> => {
        const formData = new FormData();
        
        formData.append('image', File);
        formData.append('caption', postData.caption);
        formData.append('tag', postData.tag);
        formData.append('location', postData.location);
        formData.append('authorId', postData.authorId.toString());

        try {
            console.log('Creating post with data: ', postData);
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:8080/posts/save', {
                method: 'POST',
                body: formData,
              });

              //convert from JSON to string
              const result = await response.text();
            return result;
        } catch (error) {
            console.error('Error in handleCreatePost in PostContext: ', error);
            setError('Error creating post.');
            return undefined;

        } finally {
            setLoading(false);
        }

        // console.log('Creating post with data: ', postData);
        // setLoading(true);
        // setError(null);

        // try {
        //     const response = await createPostApi(postData);

        //     if (!response || !response.data) {
        //         console.error('Invalid response from createPostApi: ', response);
        //         return undefined;
        //     }

        //     console.log('Post created successfully: ', response.data);
        //     return response.data;

        // } catch (error) {
        //     console.error('Error in handleCreatePost in PostContext: ', error);
        //     setError('Error creating post.');
        //     return undefined;

        // } finally {
        //     setLoading(false);
        // }
    };

    //EDIT post:

    //DELETE post:

    //FETCH posts on initial load:
    

    return (
        <PostContext.Provider value={{ loading, error, handleCreatePost }}>
        {children}
      </PostContext.Provider>
    );
}

//Custom hook to use post context
export function userPostContext() {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostProvider!');
    }
    return context;
}