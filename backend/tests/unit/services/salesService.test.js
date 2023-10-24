const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const { mockDBSales } = require('../../mocks/mockDataBase');

describe('Testes unitários - Services - Vendas', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('A função listAllSales deve retornar todas as vendas e o status da requisição em caso de sucesso', async function () {
    sinon.stub(models, 'findAllSales').resolves(mockDBSales);

    const { status, data } = await services.listAllSales();
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal(mockDBSales);
    expect(status).to.be.equal('OK');
  });

  it('A função listAllSales deve retornar um array vazio e o status not found em caso de erro', async function () {
    sinon.stub(models, 'findAllSales').resolves([]);

    const { status, data } = await services.listAllSales();
    expect(data).to.deep.equal({ message: 'Sales not found' });
    expect(status).to.be.equal('NOT_FOUND');
  });

  it('listSalesFromId deve retornar todas as vendas pelo ID e o status da requisição em caso de sucesso', async function () {
    sinon.stub(models, 'findSalesById').resolves([mockDBSales[0]]);

    const { status, data } = await services.listSalesFromId(1);

    expect(data).to.be.deep.equal([mockDBSales[0]]);
    expect(status).to.be.equal('OK');
  });

  it('listSalesFromId deve retornar um message e o status da requisição em caso de falha', async function () {
    sinon.stub(models, 'findSalesById').resolves([]);

    const { status, data } = await services.listSalesFromId(999);
    expect(data).to.deep.equal({ message: 'Sale not found' });
    expect(status).to.be.equal('NOT_FOUND');
  });

  it('productExists deve retornar um objeto com status OK caso o produto exista', async function () {
    sinon.stub(models, 'findProductById').resolves([mockDBSales[0]]);

    const { status } = await services.productExists(1);
    expect(status).to.be.equal('OK');
  });

  it('productExists deve retornar um erro caso produto nao exista no DB', async function () {
    sinon.stub(models, 'findProductById').resolves([]);

    const response = await services.productExists(9999);
    expect(response).to.be.deep.equal({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
  });

  it('validationItensSolds deve retornar um array com status OK caso todos os itens sejam válidos', async function () {
    sinon.stub(models, 'findProductById').resolves([mockDBSales[0]]);

    const itensSold = [{ productId: 1, quantity: 1 }];
    const response = await services.validationItensSolds(itensSold);
    expect(response).to.be.deep.equal([{ status: 'OK' }]);
  });

  it('validationItensSolds deve retornar um array com status BAD_REQUEST caso algum item nao tenha productId', async function () {
    const itensSold = [{ quantity: 1 }];
    const response = await services.validationItensSolds(itensSold);
    expect(response).to.be.deep.equal([{ status: 'BAD_REQUEST', data: { message: '"productId" is required' } }]);
  });

  it('validationItensSolds deve retornar um array com status BAD_REQUEST caso algum item nao tenha quantity', async function () {
    const itensSold = [{ productId: 1 }];
    const response = await services.validationItensSolds(itensSold);
    expect(response).to.be.deep.equal([{ status: 'BAD_REQUEST', data: { message: '"quantity" is required' } }]);
  });

  it('validationItensSolds deve retornar um array com status UNPROCESSABLE_ENTITY caso algum item tenha quantity menor ou igual a 0', async function () {
    const itensSold = [{ productId: 1, quantity: 0 }];
    const response = await services.validationItensSolds(itensSold);
    expect(response).to.be.deep.equal([{ status: 'UNPROCESSABLE_ENTITY', data: { message: '"quantity" must be greater than or equal to 1' } }]);
  });

  it('validationItensSolds deve retornar um array com status NOT_FOUND caso algum item tenha productId que nao exista no DB', async function () {
    sinon.stub(models, 'findProductById').resolves([]);

    const itensSold = [{ productId: 999, quantity: 1 }];
    const response = await services.validationItensSolds(itensSold);
    expect(response).to.be.deep.equal([{ status: 'NOT_FOUND', data: { message: 'Product not found' } }]);
  });

  it('registerSales deve retornar um objeto com status CREATED e os dados da venda em caso de sucesso', async function () {
    const mockInsertNewSale = { productId: 1, quantity: 1 };
    const mockDBProductID = [{ productId: 1, name: 'teste' }];
    sinon.stub(models, 'findProductById').resolves(mockDBProductID);
    sinon.stub(models, 'insertNewSale').resolves([mockInsertNewSale]);

    const itensSold = [{ productId: 1, quantity: 1 }];
    const response = await services.registerSales(itensSold);
    expect(response).to.be.deep.equal({ status: 'CREATED', data: [mockInsertNewSale] });
    expect(models.findProductById.calledOnce).to.be.equal(true);
  });

  it('registerSales deve retornar um erro em caso de dados incorretos', async function () {
    sinon.stub(models, 'findProductById').resolves([]);

    const itensSold = [{ productId: 999, quantity: 1 }];
    const response = await services.registerSales(itensSold);
    expect(response).to.be.deep.equal({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
  });

  it('registerSales deve retornar um erro em caso de erro no banco de dados', async function () {
    sinon.stub(models, 'findProductById').resolves([{ productId: 1, name: 'teste' }]);
    sinon.stub(models, 'insertNewSale').resolves({ message: 'ERROR' });

    const itensSold = [{ productId: 1, quantity: 1 }];
    const response = await services.registerSales(itensSold);
    expect(response).to.be.deep.equal({ status: 'ERROR', data: { message: 'ERROR' } });
  });

  it('deleteSale deve retornar um objeto com status OK e os dados da venda deletada em caso de sucesso', async function () {
    sinon.stub(models, 'deleteSale').resolves({ affectedRows: 1 });
    sinon.stub(models, 'findSalesById').resolves([mockDBSales[0]]);

    const response = await services.deleteSale(1);
    expect(response).to.be.deep.equal({ status: 'NO_CONTENT', data: { message: 'Sale deleted successfully' } });
  });

  it('deleteSale deve retornar um objeto com status NOT_FOUND e uma mensagem de erro caso a venda nao exista', async function () {
    sinon.stub(models, 'deleteSale').resolves({ affectedRows: 0 });
    sinon.stub(models, 'findSalesById').resolves([]);

    const response = await services.deleteSale(999);
    expect(response).to.be.deep.equal({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
  });

  it('deleteSale deve retornar um objeto com status ERROR e uma mensagem de erro caso ocorra um erro no banco de dados', async function () {
    sinon.stub(models, 'deleteSale').resolves({ affectedRows: 0 });
    sinon.stub(models, 'findSalesById').resolves([mockDBSales[0]]);

    const response = await services.deleteSale(1);
    expect(response).to.be.deep.equal({ status: 'ERROR', data: { message: 'database error' } });
  });
});