# **Projeto Backend - Ebytr**

## **Contexto**

Esse projeto foi desenvolvido para atender as exigências da **`Blitz`** de carreirana @trybe, uma simulação de um desafio técnico similar aos processos de recrutamento e seleção do mercado de trabalho.

O desafio consiste em desenvolver uma aplicação para controlar e listar tarefas.

---

## **Requisitos técnicos**

1. Front-End em React;
2. Back-End em NodeJS, com MongoDB;
3. Arquitetura em camadas;

### **Funcionalidades solicitadas:**

- Visualizar a lista de tarefas;
- Esta lista deve ser ordenável por ordem alfabética, data de criação ou por status;
- Inserir uma nova tarefa na lista;
- Remover uma tarefa da lista;
- Atualizar uma tarefa da lista;
- A tarefa deve possuir um status editável: pendente, em andamento ou pronto;

### **Critérios de avaliação:**
- Atendimento aos requisitos técnicos e funcionais;
- Seu projeto deve rodar sem erros;
- Entendimento dos conceitos das camadas adotadas;
- Código e componentes reutilizados;
- Habilidade em escrever testes (mínimo 30% de cobertura);
- Boa legibilidade do código;
- Separação do front e backend;
- Mensagens de commits bem descritas e commits com um escopo nítido;
- Referências de códigos de terceiros;
- Instruções nítidas no README do projeto para setup e execução da aplicação e dos testes.
---

## **Instalação**

Pré-requisitos para rodar o projeto localmente:

1. MongoDB (o arquivo .env.example já possui a variável "MONGO_DB_URL" para receber a string fornecida pelo Mongodb Atlas, caso você queira utilizar esse serviço do MongoDB);

2. NPM (Node Package Manager);

3. Copie o ssh desse repositório: `git@github.com:vitorgonzaga/ebytr-backend.git`;

4. Abra um terminal no seu computador e utilize os comandos abaixo na ordem que são apresentados:

- `git clone git@github.com:vitorgonzaga/ebytr-backend.git`
- `cd ebytr-backend`
- `code .` (caso utilize o vs code como editor);
- `npm install`
- `npm run debug` ( roda o servidor na porta local 3001 )

Observação: Caso opte por manter o banco de dados no seu computador, certifique-se de que o serviço está ativo `sudo service mongod start` (linux).

Ao executar `npm run debug` seu terminal irá demonstrar as seguintes mensagens:

![](images/nodemonRunning.png)

### **Dependências de produção**

Todas as bibliotecas (produção e desenvolvimento) serão instaladas com o comando `npm install`

![](images/dependencies.png)

---

# **FUNCIONAMENTO DA API**

A api está preparada para receber requisições http. Utilize aplicativos como Insominia, Postman, httpie para enviar as requisições conforme as observações a seguir:

## **1. Cadastro de usuário:**
* rota: `/user`;
* método **[POST]**;
* body da requisição em formato JSON (exemplo);
```
{
    "email": "vitor@gmail.com",
    "password": "123456"
}
```
* retorno esperado;
```
{
    "user": {
        "email": "vitor@gmail.com",
        "id": "620d9a63bf2c835e610071d2"
    }
}
```
## **2. login:**
* rota: `/login`;
* método **[POST]**;
* body da requisição em formato JSON (exemplo);
```
{
    "email": "mariana@gmail.com",
    "password": "123456"
}
```
* retorno esperado;
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA4MWYyYzBhMWFhNzFmYjhjZjU2NjAiLCJlbWFpbCI6Im1hcmlhbmFAZ21haWwuY29tIiwiaWF0IjoxNjQ1MDU4NTY5LCJleHAiOjE2NDUwNzY1Njl9.gr7qZpAjSYLSPFMG9GetbPIOjVxH4VQxTBXHA2U8rIE"
}
```
* O Token fornecido no momento do login deverá ser fornecido no atributo "Authorization" no "headers" da requisição http para acessar as demais rotas da aplicação. O desenvolvedor do front-end deverá "salvar" essa informação seja no LocalStorage, Redux ou ContextApi para garantir o acesso do usuário logado.

## **3. Inserir Tarefa:**
* rota: `/tasks`;
* método **[POST]**;
* `headers > authorization` deve conter o token gerado no login;
* body da requisição em formato JSON (exemplo);
```
{
    "task": "concluir os testes unitários da Blitz de Carreira"
}
```
* retorno esperado;
```
{
    "id": "620d9abdbf2c835e610071d3",
    "task": "concluir os testes unitários da Blitz de Carreira",
    "status": "pendente",
    "userId": "62081f2c0a1aa71fb8cf5660"
}
```

## **4. Listar todas as tarefas:**
* rota: `/tasks`;
* método **[GET]**;
* `headers > authorization` deve conter o token gerado no login;
* Não é necessário enviar informação no body da requisição;
* retorno esperado (array de objetos);
```
[
    {
        "_id": "620d9abdbf2c835e610071d3",
        "task": "concluir os testes unitários da Blitz de Carreira",
        "status": "pronto",
        "userId": "62081f2c0a1aa71fb8cf5660",
        "createdAt": "2022-02-17T00:45:49.379Z",
        "updatedAt": "2022-02-17T00:52:26.948Z"
    }
]
```
## **5. Editar Tarefa:**
* rota: `/tasks/:id` (cada tarefa possui um id único gerado automaticamente no momento da inserção, tal informação, juntamente com as exigências abaixo, possibilitará a **atualização** do documento com as informações dispostas no body da requisição);
* método **[PUT]**;
* `headers > authorization` deve conter o token gerado no login;
* body da requisição em formato JSON (exemplo);
```
{
    "task": "concluir os testes unitários da Blitz de Carreira",
    "status": "pronto"
}
```
* retorno esperado;
```
{
    "message": "620d9abdbf2c835e610071d3 updated"
}
```
## **6. Deletar Tarefa:**
* rota: `/tasks/:id` (cada tarefa possui um id único gerado automaticamente no momento da inserção, tal informação, juntamente com as exigências abaixo, possibilitará a **exclusão** do documento com as informações dispostas no body da requisição);
* método **[DELETE]**;
* `headers > authorization` deve conter o token gerado no login;
* Não é necessário enviar informação no body da requisição;
* retorno esperado;
```
{
    "message": "62082bcb3480086c324d53fc removed"
}
```
## **7. Obter o id da tarefa:**
* rota: `/tasks/taskid`;
* método **[GET]**;
* `headers > authorization` deve conter o token gerado no login;
* body da requisição em formato JSON (exemplo);
```
{
    "task": "concluir os testes unitários da Blitz de Carreira"
}
```
* retorno esperado;
```
{
    "id": "620d9abdbf2c835e610071d3"
}
```

# **Testes Unitários**

A pasta `./tests` contém os testes unitários desenvolvidos até o momento.

![](images/testes_unitarios.png)

# **Cobertura dos testes**

![](images/coverage.png)

# **Deploy no heroku**

Trata-se do endpoint a ser disponibilizado para o time de desenvolvimento do front-end.

`link aqui`

