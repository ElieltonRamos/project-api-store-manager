const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const { mockDBSales } = require('../../mocks/mockDataBase');

describe('Testes unitários - Services - Listagem de Vendas', function () {
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
    sinon.stub(models, 'findProductById').resolves([mockDBSales[0]]);

    const { status, data } = await services.listProductId(1);
    expect(data).to.be.an('object');
    expect(status).to.be.equal('OK');
  });

  it('listSalesFromId deve retornar um message e o status da requisição em caso de falha', async function () {
    sinon.stub(models, 'findSalesById').resolves([]);

    const { status, data } = await services.listSalesFromId(999);
    expect(data).to.deep.equal({ message: 'Sale not found' });
    expect(status).to.be.equal('NOT_FOUND');
  });
});