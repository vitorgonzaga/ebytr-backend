const chai = require('chai')
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { ObjectId } = require('mongodb');
const usersModel = require('../models/users.model');
const usersService = require('../services/users.service');

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Testes unitários (./services/users.service.js)', () => {

  const payloadUser = {
    email: 'babusantana@gmail.com',
    password: '123456',
  };

  before(async () => {
    sinon.stub(usersModel, 'addUser').resolves({ id: ObjectId('620d612b346724f25dea4bbc')})
  })

  after(async () => {
    await usersModel.addUser.restore();
  })

  describe('Inserindo um novo usuário através da função "addUserService"', () => {
    it('retorna um objeto denominado "user" com as propriedades "id" e "email"', async () => {
      const { email, password } = payloadUser;
      const response = await usersService.addUserService(email, password);
      expect(response).to.be.an('object');
      expect(ObjectId.isValid(response.user.id)).to.be.eq(true);
      expect(response.user.email).to.be.eq(email);
    });
  });

  describe('Inserindo usuário já existente através da função "addUserService"', () => {
    before(async () => {
      sinon.stub(usersModel, 'getUserByEmail').resolves(
        {
          _id: ObjectId('620d612b346724f25dea4bbc'),
          email: 'babusantana@gmail.com',
          password: '123456'
        }
      );
    });

    after(async () => {
      await usersModel.getUserByEmail.restore();
    })

    it('retorna mensagem de erro "Email already registered"', async () => {
      const { email, password } = payloadUser;
      // a lib "chai-as-promised" trata a fn expect como assíncrona
      await expect(usersService.addUserService(email, password)).to.be.rejectedWith({
        statusCode: 409,
        shortDescription: 'conflict',
        message: 'Email already registered'
      });
    })
  });
})