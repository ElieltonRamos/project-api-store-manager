const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const services = require('../../../src/services');
const controllers = require('../../../src/controllers');
const mockDBProducts = require('../../mocks/mockDataBase');

describe('Realizando testes unitários para a camada controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  it.only('getAllProducts deve retornar todos os produtos e o status da requisição em caso de sucesso', async function () {
    const mockResponse = { status: 'OK', data: mockDBProducts };
    sinon.stub(services, 'listAllProducts').resolves(mockResponse);
    
    const req = sinon.stub();
    const res = {
      status: sinon.stub(),
      json: sinon.stub(),
    };

    await controllers.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockDBProducts);
  });
});