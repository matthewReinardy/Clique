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
    const handleCreatePost = async (postData: PostCreationRequest) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createPostApi(postData);
            return response.data;
        } catch {
            setError('Error creating post.');
        } finally {
            setLoading(false);
        }
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