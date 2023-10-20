const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { mockDBProducts } = require('../../mocks/mockDataBase');

describe('Testes unitários - Models - Produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se a funcao findAllProducts retorna todos os produtos do Database', async function () {
    const responseSQL = [];
    const mockDB = [mockDBProducts, responseSQL];

    sinon.stub(connection, 'execute').resolves(mockDB);

    const response = await models.findAllProducts();

    expect(response).to.be.equal(mockDBProducts);
    expect(response).to.be.an('array');
  });

  it('Verifica se a funcao findProductById retorna o produto do Database', async function () {
    const responseSQL = [];
    const productById = mockDBProducts[0];
    const mockDB = [productById, responseSQL];

    sinon.stub(connection, 'execute').resolves(mockDB);

    const response = await models.findProductById(1);
    expect(response).to.be.equal(productById);
  });

  it('Verifica se a funcao insertNewProduct insere um novo produto no Database', async function () {
    const mockDB = [{ insertId: 1 }, []];

    sinon.stub(connection, 'execute').resolves(mockDB);

    const response = await models.insertNewProduct('produto teste');
    expect(response).to.be.equal(1);
  });
});