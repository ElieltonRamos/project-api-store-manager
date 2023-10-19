const { listProductId } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getProductId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await listProductId(id);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = getProductId;
