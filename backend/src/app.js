const express = require('express');
const routerProducts = require('./routes/routerProducts');
const routerSales = require('./routes/routerSales');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', routerProducts);

app.use('/sales', routerSales);

module.exports = app;
