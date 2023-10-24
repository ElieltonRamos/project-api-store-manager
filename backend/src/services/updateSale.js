const models = require('../models');
const { validationItensSolds } = require('./registerSales');

const updatedSale = async (saleId, productId, quantity) => {
  const [isValid] = await validationItensSolds([{ productId, quantity }]);

  if (isValid.status !== 'OK') {
    const message = isValid.data.message === 'Product not found'
      ? 'Product not found in sale' : isValid.data.message;
    return { status: isValid.status, data: { message } };
  }

  const saleExists = await models.findSalesById(saleId);
  if (saleExists.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

  const responseSaleDB = await models.updateSale(saleId, productId, quantity);
  if (!responseSaleDB) return { status: 'ERROR', data: { message: 'database error' } };
  const saleProductId = saleExists.find((item) => item.productId === Number(productId));
  return {
    status: 'OK',
    data: { ...saleProductId, saleId: Number(saleId), productId: Number(productId), quantity } };
};

module.exports = {
  updatedSale,
};