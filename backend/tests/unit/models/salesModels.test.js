const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { mockDBSales } = require('../../mocks/mockDataBase');

describe('Testes unitarios - Models - Vendas', function () {
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

  it('Verifica se a funcao createNewSale cria uma nova venda no Database', async function () {
    const responseSQL = { insertId: 1 };
    const mockDB = [responseSQL];

    sinon.stub(connection, 'execute').resolves(mockDB);

    const response = await models.createNewSale();
    expect(response).to.be.equal(1);
  });

  it('Verifica se a funcao insertNewSale insere uma nova venda no Database', async function () {
    const mockIDDatabase = [{ insertId: 1 }];
    const insertSale = [{ productId: 1, quantity: 1 }];
    const mockDBInsert = [{ affectedRows: 1 }];

    sinon.stub(connection, 'execute')
      .onFirstCall().resolves(mockIDDatabase)
      .onSecondCall()
      .resolves(mockDBInsert);

    const response = await models.insertNewSale(insertSale);

    expect(response.id).to.be.equal(1);
    expect(response).to.be.deep.equal({ id: mockIDDatabase[0].insertId, itemsSold: insertSale });
  });

  it('Verifica se a funcao insertNewSale retorna um erro caso nao receba o ID', async function () {
    const mockIDDatabase = [{ insertId: null }];
    const insertSale = [{ productId: 1, quantity: 1 }];
    const mockDBInsert = [{ affectedRows: 1 }];

    sinon.stub(connection, 'execute')
      .onFirstCall().resolves(mockIDDatabase)
      .onSecondCall()
      .resolves(mockDBInsert);

    const response = await models.insertNewSale(insertSale);

    expect(response).to.be.deep.equal({ message: 'error' });
  });

  it('Verifica se a funcao insertNewSale retorna um erro caso a venda nao seja cadastrada', async function () {
    const mockIDDatabase = [{ insertId: 10 }];
    const insertSale = [{ productId: 1, quantity: 1 }];
    const mockDBInsert = [{ affectedRows: 0 }];

    sinon.stub(connection, 'execute')
      .onFirstCall().resolves(mockIDDatabase)
      .onSecondCall()
      .resolves(mockDBInsert);

    const response = await models.insertNewSale(insertSale);

    expect(response).to.be.deep.equal({ message: 'error' });
  });

  it('Verifica se a funcao deleteSale deleta uma venda do Database', async function () {
    const mockDB = [{ affectedRows: 1 }];

    sinon.stub(connection, 'execute').resolves(mockDB);

    const response = await models.deleteSale(1);

    expect(response).to.be.deep.equal(1);
  });

  it('updateSale deve atualizar uma venda com sucesso', async function () {
    const mockDB = [{ affectedRows: 1 }];

    sinon.stub(connection, 'execute').resolves(mockDB);

    const response = await models.updateSale(1);

    expect(response).to.be.deep.equal(1);
  });
});