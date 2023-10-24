const services = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await services.searchProduct(q);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  searchProduct,
};