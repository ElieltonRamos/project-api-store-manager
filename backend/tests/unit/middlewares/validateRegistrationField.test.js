const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);
const middlewares = require('../../../src/middlewares');

describe('Testes unitários - Middlewares - validateRegistrationField', function () {
  it('validateRegistrationField', function () {
    const next = sinon.stub();
    const req = sinon.stub().returnsThis();
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };

    middlewares.validateRegistrationField(req, res, next);
    // fazer teste desse middleware
  });
});