const express = require('express');
const { getAllProducts } = require('../controllers');

const routerProducts = express.Router();

routerProducts.get('/', getAllProducts);

routerProducts.get('/:id', (_req, _res) => {});

module.exports = routerProducts;
