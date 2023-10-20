const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const { mockDBProducts } = require('../../mocks/mockDataBase');

describe('Testes unitários - Services - Produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('A função listAllProducts deve retornar todos os produtos e o status da requisição em caso de sucesso', async function () {
    sinon.stub(models, 'findAllProducts').resolves(mockDBProducts);

    const { status, data } = await services.listAllProducts();
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal(mockDBProducts);
    expect(status).to.be.equal('OK');
  });

  it('A função listAllProducts deve retornar um array vazio e o status not found em caso de erro', async function () {
    sinon.stub(models, 'findAllProducts').resolves([]);

    const { status, data } = await services.listAllProducts();
    expect(data).to.deep.equal({ message: 'Not found' });
    expect(status).to.be.equal('NOT_FOUND');
  });

  it('listProductId deve retornar um produto e o status da requisição em caso de sucesso', async function () {
    sinon.stub(models, 'findProductById').resolves([mockDBProducts[0]]);

    const { status, data } = await services.listProductId(1);
    expect(data).to.be.an('object');
    expect(status).to.be.equal('OK');
  });

  it('listProductId deve retornar um message e o status da requisição em caso de falha', async function () {
    sinon.stub(models, 'findProductById').resolves([]);

    const { status, data } = await services.listProductId(999);
    expect(data).to.deep.equal({ message: 'Product not found' });
    expect(status).to.be.equal('NOT_FOUND');
  });

  it('registerProduct deve retornar um produto e o status da requisição em caso de sucesso', async function () {
    sinon.stub(models, 'findAllProducts').resolves(mockDBProducts);
    sinon.stub(models, 'insertNewProduct').resolves(1);

    const { status, data } = await services.registerProduct('produto teste');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ id: 1, name: 'produto teste' });
    expect(status).to.be.equal('CREATED');
  });

  it('registerProduct deve retornar um message e o status da requisição em caso de falha', async function () {
    sinon.stub(models, 'findAllProducts').resolves(mockDBProducts);
    sinon.stub(models, 'insertNewProduct').resolves(null);

    const { status, data } = await services.registerProduct('Martelo de Thor');
    expect(data).to.deep.equal({ message: 'product already registered' });
    expect(status).to.be.equal('CONFLICT');
  });

  it('registerProduct deve retornar um message e o status da requisição em caso de falha do banco de dados', async function () {
    sinon.stub(models, 'findAllProducts').resolves(mockDBProducts);
    sinon.stub(models, 'insertNewProduct').resolves(undefined);

    const { status, data } = await services.registerProduct('teste');
    expect(data).to.deep.equal({ message: 'Unable to register the product' });
    expect(status).to.be.equal('ERROR');
  });
});