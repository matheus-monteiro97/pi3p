# PI-3P

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Projeto desenvolvido com <a href="http://nestjs.com" target="_blank">NestJS</a> - Framework Node.js progressivo para construção de aplicações server-side eficientes e escaláveis.</p>

## 📋 Sobre o Projeto

O PI-3P tem como objetivo modernizar e centralizar a gestão de laudos periciais odontológicos, facilitando o registro, análise e identificação forense por meio de um sistema seguro, eficiente e acessível via Web e Mobile. Ela permitirá que peritos odontolegais, dentistas forenses e órgãos competentes possam cadastrar casos, anexar evidências, gerar laudos e cruzar informações para identificação de indivíduos.

### 🚀 Principais Funcionalidades

- **Gerenciamento de Pacientes**: CRUD completo para cadastro e gestão de pacientes
- **Gestão de Casos**: Sistema para criação e acompanhamento de casos médicos
- **Evidências Médicas**: Módulo para upload e gestão de evidências
- **Relatórios**: Geração automática de relatórios médicos
- **Comparação de Resultados**: Sistema para análise e comparação de dados médicos
- **Autenticação JWT**: Sistema completo de autenticação e autorização
- **Documentação API**: Interface Swagger UI para documentação interativa
- **ORM Prisma**: Integração com banco de dados PostgreSQL
- **Validação de Dados**: Validação robusta usando class-validator
- **Testes Automatizados**: Suporte completo para testes unitários e e2e

### 🛠️ Stack Tecnológica

- **Framework**: NestJS
- **Database ORM**: Prisma
- **Autenticação**: JWT + Passport
- **Documentação**: Swagger/OpenAPI
- **Validação**: Class Validator + Class Transformer
- **Testes**: Jest
- **Linguagem**: TypeScript

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 16 ou superior)
- npm 
- Banco de dados (PostgreSQL, MySQL, SQLite)

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/matheus-monteiro97/pi3p.git
cd pi3p
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
cp .env.example .env
```

Configure as seguintes variáveis no arquivo `.env`:
```env
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pi3p_db"

# JWT
JWT_ACCESS_SECRET="seu-jwt-access-secret"
JWT_REFRESH_SECRET="seu-jwt-refresh-secret"
```

4. **Configure o banco de dados**
```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar as migrações
npx prisma migrate dev
```

## 🚀 Executando a Aplicação

### Desenvolvimento
```bash
# Modo desenvolvimento
npm run start

# Modo desenvolvimento com watch
npm run start:dev

# Modo desenvolvimento com debug
npm run start:debug
```

### Produção
```bash
# Build da aplicação
npm run build

# Executar em produção
npm run start:prod
```

A aplicação estará disponível em `http://localhost:3000`

## 📚 Documentação da API

Após iniciar a aplicação, você pode acessar a documentação interativa da API através do Swagger UI:

```
http://localhost:3000/api#/
```

## 🧪 Executando Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 🗄️ Banco de Dados

Este projeto utiliza Prisma como ORM. Para trabalhar com o banco de dados:

```bash
# Visualizar o banco de dados
npx prisma studio

# Resetar o banco de dados
npx prisma migrate reset

# Aplicar mudanças no schema
npx prisma db push
```

## 🚀 Deploy

Para fazer deploy da aplicação:

```bash
# Build para produção
npm run build

# Deploy (inclui migrações do Prisma)
npm run deploy
```

## 📞 Contato

- **Repositório**: [https://github.com/matheus-monteiro97/pi3p](https://github.com/matheus-monteiro97/pi3p)
- **Projeto**: PI-3P
- **Versão**: 0.0.1
- **Swagger UI**: [http://localhost:3000/api#/](http://localhost:3000/api#/)
