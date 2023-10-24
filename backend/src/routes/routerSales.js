const express = require('express');
const controllers = require('../controllers');

const routerSales = express.Router();

routerSales.get('/', controllers.getAllSales);

routerSales.get('/:id', controllers.getSalesFromId);

routerSales.post('/', controllers.postSales);

routerSales.delete('/:id', controllers.deleteSale);

module.exports = routerSales;
