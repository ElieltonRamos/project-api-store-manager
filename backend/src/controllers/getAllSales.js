const services = require('../services');
const mapHTTPStatus = require('../utils/mapStatusHTTP');

const getAllSales = async (_req, res) => {
  const { status, data } = await services.listAllSales();
  return res.status(mapHTTPStatus(status)).json(data);
};

module.exports = {
  getAllSales,
};
