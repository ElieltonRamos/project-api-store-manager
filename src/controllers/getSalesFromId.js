const services = require('../services');
const mapHTTPStatus = require('../utils/mapStatusHTTP');

const getSalesFromId = async (_req, res) => {
  const { id } = _req.params;
  const { status, data } = await services.listSalesFromId(id);
  return res.status(mapHTTPStatus(status)).json(data);
};

module.exports = {
  getSalesFromId,
};
