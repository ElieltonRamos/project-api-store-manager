const express = require('express');
const controllers = require('../controllers');

const routerSales = express.Router();

routerSales.get('/', controllers.getAllSales);

routerSales.get('/:id', controllers.getSalesFromId);

module.exports = routerSales;
