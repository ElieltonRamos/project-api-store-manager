const services = require('../services');
const mapHTTPStatus = require('../utils/mapStatusHTTP');

const getSalesFromId = async (_req, res) => {
  const { status, data } = await services.listSalesFromId();
  return res.status(mapHTTPStatus(status)).json(data);
};

module.exports = {
  getSalesFromId,
};
