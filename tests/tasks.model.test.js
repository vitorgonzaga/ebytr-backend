const sinon = require('sinon');
const { getConnectionMock } = require('./connectionMock');
const { MongoClient } = require('mongodb');
const userModel = require('../models/users.model');
const taskModel = require('../models/tasks.model');
const { expect } = require('chai')
const { ObjectId } = require('mongodb');

const { COLLECTION_TASKS, DB_NAME } = process.env;

describe('Testes unitários (./models/tasks.model.js)', () => {
  let connectionMock;
  let user;
  let payloadTask;

  const payloadUser = {
    email: 'babusantana@gmail.com',
    password: '123456',
  };

  before(async () => {
    connectionMock = await getConnectionMock();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    // usuário cadastrado para utilização em vários escopos
    user = await userModel.addUser(payloadUser);
    const { id } = user;
    payloadTask = {
      task: 'fazer os testes unitários da Blitz',
      status: 'pendente',
      userId: id
    }
  })

  after(async() => {
    await MongoClient.connect.restore();
  })

  describe('Inserindo uma tarefa através da função "addTaskModel"', () => {

    before(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_TASKS).deleteMany({});
    });

    it('retorna um objeto contendo um id válido', async () => {
      const { task, status, userId } = payloadTask
      const taskInserted = await taskModel.addTaskModel(task, status, userId);
      expect(taskInserted).to.be.an('object');
      expect(ObjectId.isValid(taskInserted.id)).to.be.eq(true);
    });
  });

  describe('Buscando tarefas através da função "getAllTasksModel"', () => {

    before(async () => {
      await connectionMock.db(DB_NAME).collection(COLLECTION_TASKS).deleteMany({});
      const { id } = user;
      const payloadManyTasks = [
        { task: 'revisar frontend', status: 'pendente', userId: id },
        { task: 'comprar presente da mariana', status: 'pendente', userId: id },
        { task: 'comprar café', status: 'pendente', userId: id },
        { task: 'revisar conteúdo de docker', status: 'pendente', userId: id },
        { task: 'fazer o deploy do projeto blitz', status: 'pendente', userId: id },
      ];
      await connectionMock.db(DB_NAME).collection(COLLECTION_TASKS).insertMany(payloadManyTasks);
    });

    it('quando existem tarefas cadastradas retorna um array', async () => {
      const { id } = user;
      const tasks = await taskModel.getAllTasksModel(id);
      expect(tasks).to.be.an('array');
      expect(tasks.length).to.be.eq(5);
    });
  });

  describe('Atualizando uma tarefa através da função "updateTaskModel"', () => {
    before(async () => {
      const { task, status, userId } = payloadTask
      await taskModel.addTaskModel(task, status, userId);
      // const tasks = await connectionMock.db(DB_NAME).collection(COLLECTION_TASKS).find({}).toArray();
    })

    it('espera que a tarefa seja atualizada com sucesso', async () => {
      const { id } = user;
      const { task } = payloadTask;
      const taskId = await taskModel.getTaskIdByTask(task, id);
      await taskModel.updateTaskModel(taskId, task, 'pronto');
      const taskUpdated = await connectionMock.db(DB_NAME).collection(COLLECTION_TASKS).findOne({ _id: taskId });
      expect(taskUpdated).to.be.an('object');
      expect(ObjectId.isValid(taskUpdated._id)).to.be.eq(true);
      expect(taskUpdated.userId).to.be.eql(id);
      expect(taskUpdated.task).to.be.eq(task);
      expect(taskUpdated.status).to.be.eq('pronto');
    })
  });

  describe('Removendo uma tarefa através da função "removeTaskModel"', () => {
    it('espera que a tarefa após deletada não seja econtrada no banco', async () => {
      const { id } = user;
      const { task } = payloadTask;
      const taskId = await taskModel.getTaskIdByTask(task, id);
      await taskModel.removeTaskModel(taskId);
      const taskDeleted = await connectionMock.db(DB_NAME).collection(COLLECTION_TASKS).findOne({ _id: taskId });
      expect(taskDeleted).to.be.eq(null);
    });
    it('espera que o banco possua 5 tarefas cadastradas do mesmo usuário', async () => {
      const { id } = user;
      const tasks = await taskModel.getAllTasksModel(id)
      expect(tasks).to.be.an('array');
      expect(tasks.length).to.be.eq(5);
    });
  });
});
