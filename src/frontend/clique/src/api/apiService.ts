import { ApiResponse } from "../types/userTypes"

const API_BASE_URL = 'http://localhost:8080'

/**
* makeRequest is a reusable helper function that acts as a wrapper around fetch(),
* simplifying API calls by handling the following HTTP methods: GET, POST, PUT, DELETE.
*
* @param {string} endpoint - The API endpoint to call (relative path).
* @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method - The HTTP method to use.
* @param {unknown} [body] - Optional request body (required for POST/PUT methods).
* @returns {Promise<ApiResponse<T>>} - Returns a promise that resolves to an ApiResponse with the data.
* 
* @throws {Error} - Throws an error if the request fails or the response is NOT OK.
* 
* @example
* const userData = await makeRequest<User>('users/1', 'GET')
* const newUser = await makeRequest<User>('users', 'POST', { name: 'John' })
*/
export async function makeRequest<T, B = unknown>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE', 
    body?: B 
): Promise<ApiResponse<T>> { //Type unknown will require type checking before operation

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
    }

    //RequestInit is a TS interface used to define the options object for the fetch() API
    const options: RequestInit = {
        method,
        headers,
    }

    //Checks if body is present for POST/PUT:
    if (body) {
        options.body = JSON.stringify(body) //Modifies the body property of options
    }

    try {

        const response = await fetch(`${API_BASE_URL}/${endpoint}`, options)
        console.log(`Response status from ${endpoint}: `, response.status);

        if (!response.ok) {
            const errorMsg = await response.text();
            console.log(`Error response from ${endpoint}: `, errorMsg);
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data: T = await response.json()
        console.log(`Parsed response data from ${endpoint}: `, data);
        return {data}
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error fetching ${endpoint}: ${error.message}`);
            throw new Error(error.message);
        } else {
            console.error(`Unexpected error fetching ${endpoint}`);
            throw new Error('An unexpected error occurred.');
        }
    }      
}

