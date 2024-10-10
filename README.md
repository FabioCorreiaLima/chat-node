# Chat em Tempo Real com Autenticação de Usuários

Este projeto implementa um sistema de chat em tempo real usando **Socket.io**, onde os usuários podem criar e entrar em salas de chat. O projeto utiliza **MySQL** para o gerenciamento de login e registro de usuários e **MongoDB** para a criação e listagem das salas.

## Funcionalidades Principais

### Autenticação de Usuários

- **Login e Registro de Usuários**: Sistema de cadastro e login com autenticação JWT.
- **Proteção de Rotas**: Acesso ao chat protegido por autenticação via token.

### Chat em Tempo Real

- **Comunicação via Socket.io**: Envio de mensagens em tempo real dentro das salas de chat.
- **Mensagens de Áudio**: Permite gravar e enviar mensagens de áudio para outros participantes da sala.
- **Notificações em Tempo Real**: Os usuários são notificados quando alguém entra, sai ou está digitando na sala.
- **Criação e Listagem de Salas**: MongoDB é usado para armazenar as informações das salas e listá-las para os usuários.

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **Socket.io** (para comunicação em tempo real)
- **MySQL** (para login e registro de usuários)
- **MongoDB** (para criação e gerenciamento das salas)
- **Sequelize** (ORM para o banco de dados MySQL)
- **JWT** (para autenticação de usuários)

## Requisitos

- Node.js 
- MySQL 
- MongoDB

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/SeuUsuario/chat-real-time.git
2. Navegue até o diretório do projeto:
  
    ```bash
     cd my-express-api

4. Instale as dependências:
   ```bash
    npm install

## Configuração
### Configure as variáveis de ambiente criando um arquivo .env com as seguintes variáveis:

- env
- Copiar código
- MYSQL_HOST=localhost
- MYSQL_USER=root
- MYSQL_PASSWORD=sua_senha
- MYSQL_DATABASE=nome_do_banco_de_dados
- MONGODB_URI=mongodb://localhost:27017/nome_do_banco
- JWT_SECRET=sua_chave_secreta
  
## Execute as migrações do banco de dados MySQL com o Sequelize:
    npx sequelize-cli db:migrate
## Como Executar
### Inicie o servidor Node.js:
    npm start
### Acesse a aplicação no navegador no endereço:
    http://localhost:3001
### A partir da página Index, fazer login e começar a usar o sistema de chat ou você pode criar uma conta,.


### Link do projeto em video
  https://youtu.be/S-UJiAe4K5E
