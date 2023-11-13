const services = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await services.deleteSale(id);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  deleteSale,
};