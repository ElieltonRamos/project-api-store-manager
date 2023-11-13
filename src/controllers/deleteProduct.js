const services = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const deleteProduct = async (req, res) => {
  const { status, data } = await services.deleteProduct(req.params.id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  deleteProduct,
};