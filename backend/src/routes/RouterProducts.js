const express = require('express');
const controllers = require('../controllers');

const routerProducts = express.Router();

routerProducts.get('/', controllers.getAllProducts);

routerProducts.get('/:id', controllers.getProductId);

module.exports = routerProducts;
