const services = require('../services');
const mapHTTPStatus = require('../utils/mapStatusHTTP');

const postProducts = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await services.registerProduct(name);
  res.status(mapHTTPStatus(status)).json(data);
};

module.exports = {
  postProducts,
};