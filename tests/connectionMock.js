const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

// abre uma instancia com o mongo memory server
const DBServer = new MongoMemoryServer();

// utiliza-se as mesmas opções de uma conexão real
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

// declara a função que faz a conexão
const getConnectionMock = async () => {
  const URLMock = await DBServer.getUri() // Essa função encontra a url onde está rodando o servidor mockado
  return MongoClient.connect(URLMock, OPTIONS);
}

module.exports = {
  getConnectionMock,
}