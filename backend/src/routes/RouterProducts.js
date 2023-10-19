const express = require('express');
const { getAllProducts, getProductId } = require('../controllers');

const routerProducts = express.Router();

routerProducts.get('/', getAllProducts);

routerProducts.get('/:id', getProductId);

module.exports = routerProducts;
