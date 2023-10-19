const services = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data } = await services.listProductId(id);
    res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = getProductId;
