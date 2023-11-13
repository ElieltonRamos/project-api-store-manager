const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const middlewares = require('../../../src/middlewares');

describe('Testes unitários - Middlewares - validateRegistrationField', function () {
  it('validateRegistrationField deve chamar o next em caso de sucesso', function () {
    const next = sinon.stub().returns();
    const req = { body: { name: 'Teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    middlewares.validateRegistrationField(req, res, next);
    expect(next).to.be.calledWith();
  });

  it('validateRegistrationField deve responder em caso de erro', function () {
    const next = sinon.stub().returns();
    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    middlewares.validateRegistrationField(req, res, next);
    expect(next).to.be.not.calledWith();
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"name" is required' });
  });

  it('validateRegistrationField deve responder caso name seja menor que 5 letras', function () {
    const next = sinon.stub().returns();
    const req = { body: { name: 'Test' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    middlewares.validateRegistrationField(req, res, next);
    expect(next).to.be.not.calledWith();
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWith({
      message: '"name" length must be at least 5 characters long',
    });
  });
});