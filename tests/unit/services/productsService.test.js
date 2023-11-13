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

    const { status, data } = await services.registerProduct('teste');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ id: 1, name: 'teste' });
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

  it('deleteProduct deve retornar um message e o status da requisição em caso de sucesso', async function () {
    sinon.stub(models, 'findProductById').resolves([mockDBProducts[0]]);
    sinon.stub(models, 'deleteProduct').resolves(1);

    const { status, data } = await services.deleteProduct(1);
    expect(data).to.be.deep.equal('product deleted success');
    expect(status).to.be.equal('NO_CONTENT');
  });

  it('deleteProduct deve retornar um message e o status da requisição caso id nao seja passado', async function () {
    const { status, data } = await services.deleteProduct(null);
    expect(data).to.be.deep.equal({ message: '"id" is required' });
    expect(status).to.be.equal('BAD_REQUEST');
  });

  it('deleteProduct deve retornar um message e o status da requisição em caso de falha do Database', async function () {
    sinon.stub(models, 'findProductById').resolves([mockDBProducts[0]]);
    sinon.stub(models, 'deleteProduct').resolves(null);

    const { status, data } = await services.deleteProduct(1);
    expect(data).to.be.deep.equal({ message: 'Internal error' });
    expect(status).to.be.equal('ERROR');
  });

  it('deleteProduct deve retornar um message e o status da requisição em caso o produto nao exista', async function () {
    sinon.stub(models, 'findProductById').resolves([]);
    sinon.stub(models, 'deleteProduct').resolves(0);

    const { status, data } = await services.deleteProduct(1);
    expect(data).to.be.deep.equal({ message: 'Product not found' });
    expect(status).to.be.equal('NOT_FOUND');
  });

  it('updateProduct deve retornar um produto e o status da requisição em caso de sucesso', async function () {
    sinon.stub(models, 'findProductById').resolves([mockDBProducts[0]]);
    sinon.stub(models, 'updateProduct').resolves(1);

    const { status, data } = await services.updateProduct(1, 'produto teste');
    expect(data).to.be.deep.equal({ id: 1, name: 'produto teste' });
    expect(status).to.be.equal('OK');
  });

  it('updateProduct deve retornar um message e o status da requisição em caso de falha do Database', async function () {
    sinon.stub(models, 'findProductById').resolves([mockDBProducts[0]]);
    sinon.stub(models, 'updateProduct').resolves(undefined);

    const { status, data } = await services.updateProduct(1, 'produto teste');
    expect(data).to.be.deep.equal({ message: 'Internal server error' });
    expect(status).to.be.equal('ERROR');
  });

  it('updateProduct deve retornar um message e o status da requisição em caso o produto nao exista', async function () {
    sinon.stub(models, 'findProductById').resolves([]);
    sinon.stub(models, 'updateProduct').resolves(0);

    const { status, data } = await services.updateProduct(1, 'produto teste');
    expect(data).to.be.deep.equal({ message: 'Product not found' });
    expect(status).to.be.equal('NOT_FOUND');
  });

  it('searchProduct deve retornar um array de produtos e o status da requisição em caso de sucesso', async function () {
    sinon.stub(models, 'seachProductByName').resolves(mockDBProducts);

    const { status, data } = await services.searchProduct('');
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal(mockDBProducts);
    expect(status).to.be.equal('OK');
  });
});