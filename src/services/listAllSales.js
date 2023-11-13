const models = require('../models');

const listAllSales = async () => {
  const sales = await models.findAllSales();
  const status = sales.length > 0 ? 'OK' : 'NOT_FOUND';
  const data = sales.length > 0 ? sales : { message: 'Sales not found' };
  return { status, data };
};

module.exports = {
  listAllSales,
};