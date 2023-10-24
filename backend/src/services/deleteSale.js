const models = require('../models');

const deleteSale = async (id) => {
  const searchSale = await models.findSalesById(id);
  if (searchSale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  const resDB = await models.deleteSale(id);
  if (resDB.affectedRows === 0) return { status: 'ERROR', data: { message: 'database error' } };
  return { status: 'NO_CONTENT', data: { message: 'Sale deleted successfully' } };
};

module.exports = {
  deleteSale,
};