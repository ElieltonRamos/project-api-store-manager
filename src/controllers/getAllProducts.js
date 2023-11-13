const mapStatusHTTP = require('../utils/mapStatusHTTP');
const services = require('../services');

const getAllProducts = async (_req, res) => {
  const { status, data } = await services.listAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = getAllProducts;
