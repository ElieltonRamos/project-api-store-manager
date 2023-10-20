const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const services = require('../../../src/services');
const controllers = require('../../../src/controllers');
const { mockDBSales } = require('../../mocks/mockDataBase');

describe('Testes unitários - Controller - Listagem de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getAllSales deve retornar todas as vendas e o status da requisição em caso de sucesso', async function () {
    const mockResponse = { status: 'OK', data: mockDBSales };
    sinon.stub(services, 'listAllSales').resolves(mockResponse);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    await controllers.getAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockDBSales);
  });

  it('getAllSales deve retornar um objeto message e o status da requisição em caso de falha', async function () {
    const mockResponse = { status: 'NOT_FOUND', data: { message: 'Not found' } };
    sinon.stub(services, 'listAllSales').resolves(mockResponse);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    await controllers.getAllSales(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Not found' });
  });

  it('getSalesFromId deve retornar uma venda e o status da requisição em caso de sucesso', async function () {
    const mockResponse = { status: 'OK', data: [mockDBSales[0]] };
    sinon.stub(services, 'listSalesFromId').resolves(mockResponse);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    await controllers.getSalesFromId(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([mockDBSales[0]]);
  });

  it('getSalesFromId deve retornar um message e o status da requisição em caso de produto nao encontrado', async function () {
    const mockResponse = { status: 'NOT_FOUND', data: { message: 'Sales not found' } };
    sinon.stub(services, 'listSalesFromId').resolves(mockResponse);

    const req = { params: { id: 9999 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    await controllers.getSalesFromId(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sales not found' });
  });
});