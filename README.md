# Task Manager
API para um gerenciador de projetos e tarefas (estilo Trello), desenvolvido com Node.js. Este projeto consiste em uma API que armazena e controla os dados num banco MySQL com o auxílio do ORM Sequelize. Desafio proposto durante a trilha de aprendizado do programa de bolsas de Blockchain - Compass.

## Pré-requisitos
:warning: [Node.js](https://nodejs.org/en/download/)

:warning: [Docker](https://www.docker.com/products/docker-desktop)

O projeto utiliza um arquivo ``docker-compose.yml`` para criar e gerenciar os conteineres resposáveis pelo banco de dados e pelo [Adminer](https://www.adminer.org) - Ferramenta de gerenciamento de banco de dados.

## Configuração inicial 
Para poder utilizar a aplicação, deve-se clonar o repositório remoto para a sua máqui local. Isso pode ser realizado através do comando:

``git clone https://github.com/wandreus-muhl/task-manager.git``

Após clonar o repositório, abra-o em um terminal e execute: 

``npm install``

Ao fazer isso, as bibliotecas utilizadas pela apicação serão instaladas.

Com as bibliotecas instaladas, basta configurar as váriaveis de ambiente. Para isso, copie o conteúdo do arquivo `.env.example` e cole-o em um novo arquivo, o qual ser nomeado 

## Executando a aplicação
O arquivo `package.json` já contém um script que inicia tanto o servidor da aplicação quanto os contêineres do banco de dados e Adminer, basta executar: 
``npm start``

Se tudo estiver configurado corretamente, será exibido no console:
~~~
📇 - Banco de dados sincronizado
🚀 - Servidor rodando em http://localhost:3000 
💻 - Adminer hospedado em http://localhost:8080
~~~

## Funcionalidades
Essa API conta com funcionalidades para o gerenciamento de projetos, bem como suas tarefas. Segue uma lista das funcionalidades desenvolvidas

### Projetos
- Criação de projetos: através da rota `POST - /project`, pode-se criar um novo projeto no banco de dados. Nessa rota também é possível criar tarefas para o projeto, basta adicionar um vetor no corpo da requisição. O formato do corpo deve ser: 
  ~~~
    {
      "title": "API Task Manager",
      "description": "API para um gerenciador de projetos e tarefas...",
      "tasks": [{
          "title": "Criação do arquivo README.md",
          "taskRelevance": 10
      }]
    }
  ~~~
- Listagem de projetos: através da rota `GET - /project` pode-se visualizar todos os projetos criados no banco de dados. 
- Exclusão de projetos: por meio da rota `DELETE - /project/:projectId` é possível excluir o registro de um projeto do banco de dados. O ID do projeto a ser excluído deve ser informado nos parâmetros da rota. **ATENÇÃO!** Excluir um projeto também excluirá todas as tarefas do mesmo.
- Edição de projetos: através da rota `PUT - /project/:projectId` é possível editar o registro de um projeto. Basta informar no corpo da requisição os campos que deseja-se alterar e seus novos valores. Não é possível aterar o ID de um projeto, assim como, essa rota não é responsável pela edição de tarefas.
  ~~~
    {
      "title": "API Task Manager",
      "description": "Praesent lobortis quam id lacus varius feugiat...
    } 
  ~~~

Vale lembrar que nos métodos de criação e edição de um projeto, é realizada uma validação, evitando que os campos sejam cadastrados com valores vazios.
### Tarefas
- Criação de atividades: através da rota `POST - /project/:projectId/task`, pode-se criar uma nova tarefa relacionada com o projeto no banco de dados, para isso, deve-se informar, nos parâmetros, o ID do projeto ao qual essa tarefa pertencerá. O formato do corpo deve ser: 
  ~~~
    {
      "title": "Criação do arquivo README.md",
      "taskRelevance": 8
    }
  ~~~
- Listagem das atividades de um projeto: através da rota `GET - /project/:projectId` pode-se visualizar todas as atividades relacionadas com o projeto desejado. 
- Listagem de uma única atividade: por meio da rota `GET - /project/:projectId/task/:taskId` é possível visualizar as informações de uma única atividade, basta informar o ID da mesma, e também o ID do projeto ao qual ela pertence.
- Exclusão de atividades: por meio da rota `DELETE - /project/:projectId` é possível excluir o registro de uma atividade do banco de dados. O ID da atividade a ser excluída deve ser informado nos parâmetros da rota.
- Edição de atividade: através da rota `PUT - /project/:projectId/task/:taskId` é possível editar o registro de um atividade. Basta informar no corpo da requisição os campos que deseja-se alterar e seus novos valores. Não é possível aterar o ID de uma atividade, nem o projeto ao qual ela pertence.
  ~~~
    {
      "title": "Task !",
      "completed": true,
      "taskRelevance": 8
    }
  ~~~

A criação e edição de tarefas também passam por uma validação. O campo `title` não pode ser vazio e o campo `taskRelevance` deve ter seu valor entre 0 e 10. Durante a edição, não é necessário informar todos os campos, basta adicionar os que queira alterar.

O endereço completo para as rotas é: `https://localhost:<API_PORT>/api/<rota>`

