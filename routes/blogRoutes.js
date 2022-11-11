const express = require('express');
const { createBlogPost, getPost, editPost, deletePost, userBlogPosts, getAllPublishedPosts } = require('../Controllers/blogController');
const { AuthProcedure } = require('../middleware/basicAuth');

const blogRouter = express.Router();

blogRouter.get("/allBlogs", AuthProcedure, userBlogPosts);

blogRouter.post('/newPost', AuthProcedure, createBlogPost);

blogRouter.get('/:id', AuthProcedure, getPost);

blogRouter.get('/published-blogs', getAllPublishedPosts);

blogRouter.patch('/:id', AuthProcedure, editPost);

blogRouter.delete('/:id', AuthProcedure, deletePost);

module.exports = blogRouter;