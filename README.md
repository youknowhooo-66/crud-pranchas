# CRUD Pranchas 🏄

Um projeto de API REST desenvolvido com **MVC HTTP** para gerenciamento de pranchas de surfe, utilizando **Prisma** como ORM e **MySQL** como banco de dados.

## 📋 Descrição

Sistema CRUD completo para gerenciar pranchas de surfe, com operações de criar, ler, atualizar e deletar informações. Arquitetura baseada em padrões REST e MVC.

## 🛠️ Tecnologias Utilizadas

- **JavaScript** (87.5%) - Backend
- **HTML** (9.4%) - Frontend
- **CSS** (3.1%) - Estilização
- **Prisma** - ORM para banco de dados
- **MySQL** - Banco de dados relacional
- **Node.js** - Runtime JavaScript

## 📁 Estrutura do Projeto

```
crud-pranchas/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── views/
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- MySQL servidor rodando
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/youknowhooo-66/crud-pranchas.git
cd crud-pranchas
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas credenciais do MySQL
```

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

5. Inicie o servidor:
```bash
npm start
```

## 📡 Endpoints da API

### Pranchas
- **GET** `/pranchas` - Listar todas as pranchas
- **GET** `/pranchas/:id` - Obter prancha por ID
- **POST** `/pranchas` - Criar nova prancha
- **PUT** `/pranchas/:id` - Atualizar prancha
- **DELETE** `/pranchas/:id` - Deletar prancha

## 📦 Dependências Principais

- `@prisma/client` - Cliente Prisma
- `express` - Framework web (se utilizado)
- `mysql2` - Driver MySQL

## 👨‍💻 Autor

[youknowhooo-66](https://github.com/youknowhooo-66)

## 📝 Licença

Este projeto está aberto para uso pessoal e educacional.

---

**Desenvolvido em 2026** 🚀
