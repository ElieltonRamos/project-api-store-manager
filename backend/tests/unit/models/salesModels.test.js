const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { mockDBSales } = require('../../mocks/mockDataBase');

describe('Testes unitarios - Models - Listagem de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se a funcao findAllSales retorna todos os produtos do Database', async function () {
    const responseSQL = [];
    const mockDB = [mockDBSales, responseSQL];

    sinon.stub(connection, 'execute').resolves(mockDB);

    const response = await models.findAllSales();

    expect(response).to.be.equal(mockDBSales);
    expect(response).to.be.an('array');
  });

  it('Verifica se a funcao findSalesFromId retorna o produto do Database', async function () {
    const responseSQL = [];
    const SalesById = mockDBSales[0];
    const mockDB = [SalesById, responseSQL];

    sinon.stub(connection, 'execute').resolves(mockDB);

    const response = await models.findSalesById(1);
    expect(response).to.be.equal(SalesById);
  });
});