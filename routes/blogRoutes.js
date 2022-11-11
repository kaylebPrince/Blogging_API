const express = require('express');
const { createBlogPost, getPosts, getPost, editPost, deletePost, userBlogPosts } = require('../Controllers/blogController');
const { AuthProcedure } = require('../middleware/basicAuth');

const blogRouter = express.Router();

blogRouter.get("/allBlogs", AuthProcedure, userBlogPosts);

blogRouter.post('/newPost', AuthProcedure, createBlogPost);

blogRouter.get('/:id', AuthProcedure, getPost);

blogRouter.get('/blogs', getPosts);

blogRouter.patch('/edit/:id', AuthProcedure, editPost);

blogRouter.delete('/delete/:id', AuthProcedure, deletePost);

module.exports = blogRouter;