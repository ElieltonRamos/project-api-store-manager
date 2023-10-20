const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const services = require('../../../src/services');
const controllers = require('../../../src/controllers');
const { mockDBProducts } = require('../../mocks/mockDataBase');

describe('Testes unitários - Controller - Products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getAllProducts deve retornar todos os produtos e o status da requisição em caso de sucesso', async function () {
    const mockResponse = { status: 'OK', data: mockDBProducts };
    sinon.stub(services, 'listAllProducts').resolves(mockResponse);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    await controllers.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockDBProducts);
  });

  it('getAllProducts deve retornar um objeto message e o status da requisição em caso de falha', async function () {
    const mockResponse = { status: 'NOT_FOUND', data: { message: 'Not found' } };
    sinon.stub(services, 'listAllProducts').resolves(mockResponse);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    await controllers.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Not found' });
  });

  it('getProductId deve retornar um produto e o status da requisição em caso de sucesso', async function () {
    const mockResponse = { status: 'OK', data: [mockDBProducts[0]] };
    sinon.stub(services, 'listProductId').resolves(mockResponse);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    await controllers.getProductId(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([mockDBProducts[0]]);
  });

  it('getProductId deve retornar um message e o status da requisição em caso de produto nao encontrado', async function () {
    const mockResponse = { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    sinon.stub(services, 'listProductId').resolves(mockResponse);

    const req = { params: { id: 9999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    await controllers.getProductId(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});