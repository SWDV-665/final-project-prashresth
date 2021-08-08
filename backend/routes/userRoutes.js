const express = require('express');
const userRouter = express.Router();

// trying out destructuring here instead of naming the controller.
const { get, getUserById, getUserByEmail,post, userDelete } = require('../controllers/userController');

// all user routes that call the user controller
userRouter.get('/', get)
userRouter.get('/email', getUserByEmail)
userRouter.get('/:id', getUserById)
userRouter.post('', post)
userRouter.delete('/:id', userDelete)

module.exports = userRouter;
