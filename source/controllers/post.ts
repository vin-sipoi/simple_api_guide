/**
 * Handles all the APIs logic
 * 
 * Getting posts (getPosts - A request to fetch all posts in the list.)
 * Getting a single post (getPost - A request to fetch a single post by id.)
 * Updating a post (updatePost - A request to update a post with new values.)
 * Deleting a post (deletePost - A request to delete an existing post.)
 * creating a post (addPost - A request to add a new post to the existing list.)
 */

import { Request, Response, NextFunction, response } from "express";
import axios, {AxiosResponse} from "axios";

interface Post{
    userId: Number
    Id: number
    title: String
    body: String
}

// Getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) =>{

    // Get some posts
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    let post: [Post] = result.data;
    return res.status(200).json({
        message: post
    })
}

// Getting a single post 
const getPost = async(req: Request, res: Response, next: NextFunction) =>{
    // Get the id from the req
    let id : string = req.params.id;

    // get the post
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`); 
    let post: [Post] = result.data;
    return res.status(200).json({
        message: post
    })
}

// Updating the post 
const updatePost = async (req: Request, res: Response, next: NextFunction) =>{
   
    // Get the post id from the req.params
    let id: string = req.params.id;
    
    // Get data from req body.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    
    // Update the post
    let response : AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        ...(title && {title}),
        ...(body && {body})
    });

    // Return the response
    return res.status(200).json({
        message: response.data
    });      
}

// Delete a post
const deletePost = async (req: Request, res:Response, next: NextFunction) =>{

    // Get the id from req.params
    let id: string = req.params.id;

    let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

    return res.status(200).json({
        message: 'post deleted successfuly'
    });
}

// adding post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
    // Get the data from req.body

    let title: string = req.body.title;
    let body: string = req.body.body;

    // Add post
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`,{
        title,
        body
    });

    // return response
    return res.status(200).json({
        message: response.data
    })
}

export default {getPosts, getPost, updatePost, deletePost, addPost};

