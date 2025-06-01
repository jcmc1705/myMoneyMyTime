# 💰 My Money My Time

Projeto monolítico sobre finanças pessoais, construído com **Nx**.  
Atualmente em desenvolvimento, com foco na gestão de **transações financeiras** e exibição de **dashboard financeiro** com totais de entradas, saídas e saldo.

---

## 📚 Sumário

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Como usar](#como-usar)
- [Testes](#testes)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## 📖 Sobre

O **My Money My Time** é um projeto pessoal para controle financeiro, desenvolvido como um monólito utilizando o [Nx](https://nx.dev/) para organização do workspace.  
A proposta do sistema é permitir que usuários tenham controle total de suas finanças, começando com o gerenciamento de **transações** (entradas e saídas) e com um **dashboard financeiro** com informações resumidas.

---

## ✅ Funcionalidades

Atualmente o projeto possui:

- [x] Criar transações
- [x] Editar transações
- [x] Excluir transações
- [x] Listar transações
- [x] Dashboard com total de entradas, saídas e saldo

---

## 🧰 Tecnologias

Tecnologias e ferramentas utilizadas:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Nx Monorepo](https://nx.dev/)
- [Jest](https://jestjs.io/) (Testes unitários e de integração)
- [Prettier](https://prettier.io/) (Análise estática de código)

---

## 🛠️ Instalação

### 🧱 Instalação (ambiente local)

> Pré-requisitos: Node.js, MySQL, Docker e npm/yarn instalados

```bash
# Clone o repositório
git clone https://github.com/jcmc1705/myMoneyMyTime.git

# Acesse a pasta do projeto
cd myMoneyMyTime

# Suba os containers
docker-compose up

# Instale as dependências
npm install

# Configure o banco de dados e variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações do MySQL

# Gere os arquivos do Prisma
cd apps/api
npx prisma generate
npx prisma migrate dev

# Rode o projeto (tanto backend quanto frontend com Nx)
npx nx run-many --target=serve --all
```

---

## ▶️ Como usar

Após a aplicação estar rodando:

- Acesse o frontend em `http://localhost:4200`
- A API estará disponível em `http://localhost:3000/api`

**Rotas de API disponíveis**:

```http
GET    /api/dashboard          -> Lista dashboard
GET    /api/transactions       -> Lista transações
GET    /api/transactions/:id   -> Lista transação
POST   /api/transactions       -> Cria nova transação
PUT    /api/transactions/:id   -> Atualiza transação
DELETE /api/transactions/:id   -> Remove transação
```

---

## 🧪 Testes

```bash
# Executar testes unitários e de integração
npx nx test api

# Verificar formatação e estilo de código com Prettier
npx prettier --check .

---

## 📩 Contato

Leonardo Victor - leonardovff@gmail.com
Julio Calheiros – julio.calheiros17@gmail.com - [LinkedIn](https://www.linkedin.com/in/julio-calheiros-125850235)

---

> Projeto em constante evolução 🚀