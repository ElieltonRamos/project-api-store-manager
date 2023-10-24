const services = require('../services/updateSale');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const updatedSale = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await services.updatedSale(saleId, productId, quantity);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  updatedSale,
};