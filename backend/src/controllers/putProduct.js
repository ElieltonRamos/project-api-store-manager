const services = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await services.updateProduct(id, name);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  putProduct,
};