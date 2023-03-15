import axios from "axios"

const url = "http://localhost:5000/posts";

export const fetchposts = () => axios.get(url);

export const createPost = (newPost)=> axios.post(url,newPost);
