const services = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const postSales = async (req, res) => {
  const { status, data } = await services.registerSales(req.body);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  postSales,
};