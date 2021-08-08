const express = require('express');
const postRouter = express.Router();

const PostController = require('../controllers/postController');

postRouter.post('', PostController.post)
postRouter.get('/', PostController.get)
postRouter.get('/:id', PostController.getItemById)

module.exports = postRouter;
