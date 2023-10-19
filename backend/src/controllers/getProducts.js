const mapStatusHTTP = require('../utils/mapStatusHTTP');
const services = require('../services');

const getAllProducts = async (_req, res) => {
  try {
    const { status, data } = await services.listAllProducts();
    return res.status(mapStatusHTTP(status)).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = getAllProducts;
