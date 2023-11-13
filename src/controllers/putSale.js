const services = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const putSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await services.updateSale(saleId, productId, quantity);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  putSale,
};