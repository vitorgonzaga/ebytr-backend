const sinon = require('sinon');
const path = require('path');
const userModel = require(path.resolve(__dirname, '..', './models/users.model.js'));
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const { getConnectionMock } = require('./connectionMock') // Conexão mockada

const { COLLECTION_USERS, DB_NAME } = process.env;

describe('Testes unitários (./models/users.model.js)', () => {
  let connectionMock;

  const payloadUser = {
    email: 'babusantana@gmail.com',
    password: '123456',
  };

  // ========================================================
  // dublê da conexão real
  before(async () => {
    connectionMock = await getConnectionMock();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await MongoClient.connect.restore();
  });
// ========================================================

  describe('Inserindo usuário através da função "addUser"', () => {
    before(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_USERS).deleteMany({})
    })

    it('retorna um objeto com a propriedade "id" contendo um ObjectId do mongoDB', async () => {
      const { email, password } = payloadUser;
      const response = await userModel.addUser(email, password);
      expect(response).to.be.an('object');
      expect(response).have.property('id');
      expect(ObjectId.isValid(response.id)).to.be.eq(true);
    });
  });

  describe('Consulta de usuário através da função "getUserByEmail"', () => {
    it('retorna um objeto com as propriedades _id, email e password', async () => {
      const response = await userModel.getUserByEmail('babusantana@gmail.com')
      expect(response).to.be.an('object');
      expect(response).have.property('_id')
      expect(response).have.property('email')
      expect(response).have.property('password')
      expect(response.password).to.be.equal('123456')
      expect(ObjectId.isValid(response._id)).to.be.eq(true);
    })
  });

})
