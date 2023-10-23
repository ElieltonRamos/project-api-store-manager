const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const routerProducts = express.Router();

routerProducts.get('/', controllers.getAllProducts);

routerProducts.get('/:id', controllers.getProductId);

routerProducts.post('/', middlewares.validateRegistrationField, controllers.postProducts);

routerProducts.delete('/:id', controllers.deleteProduct);

module.exports = routerProducts;
