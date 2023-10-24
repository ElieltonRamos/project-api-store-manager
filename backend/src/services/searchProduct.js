const models = require('../models');

const searchProduct = async (queryParams) => {
  const productsIsName = await models.seachProductByName(queryParams);
  return { status: 'OK', data: productsIsName };
};

module.exports = {
  searchProduct,
};