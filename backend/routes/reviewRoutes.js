const express = require('express');
const reviewRouter = express.Router();

const reviewController = require('../controllers/reviewController');

// all review routes that call the review controller
reviewRouter.get('/pending', reviewController.getPending)
reviewRouter.get('/', reviewController.get)
reviewRouter.get('/pending/:id', reviewController.pendingGetById)
reviewRouter.post('/pending/:id', reviewController.pendingApprove)
reviewRouter.delete('/pending/:id', reviewController.pendingDelete)

module.exports = reviewRouter;
