const express = require('express');
const groceryRouter = express.Router();

const GroceryController = require('../controllers/groceryController');

// all grocery routes that call the grocery controller
groceryRouter.get('/', GroceryController.get)
groceryRouter.get('/:id', GroceryController.getItemById)
groceryRouter.post('', GroceryController.post)
groceryRouter.put('/:id', GroceryController.itemUpdate)
groceryRouter.delete('/:id', GroceryController.itemDelete)

module.exports = groceryRouter;
