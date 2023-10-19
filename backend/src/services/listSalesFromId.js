const models = require('../models');

const listSalesFromId = async (id) => {
  const sales = await models.findSalesById(id);
  const status = sales.length > 0 ? 'OK' : 'NOT_FOUND';
  const data = sales.length === 0 ? { message: 'Sale not found' } : sales;
  return { status, data };
};

module.exports = {
  listSalesFromId,
};
