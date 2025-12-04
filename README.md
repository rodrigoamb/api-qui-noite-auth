# API de Anúncios - OLX 2.0

API REST para gerenciamento de anúncios de produtos, desenvolvida com Node.js, Express e Sequelize.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- JWT (Autenticação)
- Bcrypt (Hash de senhas)

## Estrutura do Projeto

```
api-olx-2.0/
├── src/
│   ├── config/          # Configurações (DB, JWT, CORS)
│   ├── models/          # Modelos Sequelize (Usuario, Anuncio)
│   ├── repositories/    # Camada de acesso aos dados
│   ├── controllers/     # Lógica de negócio e handlers HTTP
│   ├── routes/          # Definição de rotas
│   ├── middlewares/     # Middleware de autenticação
│   └── app.js           # Configuração do Express
├── server.js            # Entrada da aplicação
├── package.json         # Dependências
└── .env                 # Variáveis de ambiente
```

## Instalação

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` com suas credenciais do PostgreSQL:

```env
DB_HOST=localhost
DB_NAME=db_anuncios
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_PORT=5432

JWT_SECRET=seu_segredo_super_seguro_aqui
JWT_EXPIRES_IN=2h

PORT=3000
```

4. Crie o banco de dados PostgreSQL:

```sql
CREATE DATABASE db_anuncios;
```

5. Inicie o servidor:

```bash
npm start
```

Ou em modo de desenvolvimento (com auto-reload):

```bash
npm run dev
```

## Endpoints da API

### Autenticação

#### Registrar Usuário
```http
POST /api/auth/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(85) 99999-9999",
  "senha": "123456"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "123456"
}
```

#### Logout
```http
POST /api/auth/logout
```

### Anúncios

#### Listar Todos os Anúncios (Rota Pública)
```http
GET /api/anuncios
```

Retorna todos os anúncios com o nome do criador, mas sem o telefone.

#### Listar Meus Anúncios (Autenticado)
```http
GET /api/anuncios/meus-anuncios
Cookie: token=<jwt_token>
```

#### Buscar Anúncio por ID (Autenticado)
```http
GET /api/anuncios/:id
Cookie: token=<jwt_token>
```

Apenas o criador do anúncio pode visualizar.

#### Criar Anúncio (Autenticado)
```http
POST /api/anuncios
Cookie: token=<jwt_token>
Content-Type: application/json

{
  "titulo": "iPhone 13 Pro Max",
  "descricao": "iPhone em perfeito estado, 256GB",
  "preco": 4500.00,
  "foto_url": "https://exemplo.com/foto.jpg"
}
```

#### Atualizar Anúncio (Autenticado)
```http
PUT /api/anuncios/:id
Cookie: token=<jwt_token>
Content-Type: application/json

{
  "titulo": "iPhone 13 Pro Max - ATUALIZADO",
  "descricao": "iPhone em perfeito estado, 256GB, com capa",
  "preco": 4300.00,
  "foto_url": "https://exemplo.com/foto.jpg"
}
```

Apenas o criador do anúncio pode atualizar.

#### Deletar Anúncio (Autenticado)
```http
DELETE /api/anuncios/:id
Cookie: token=<jwt_token>
```

Apenas o criador do anúncio pode deletar.

## Estrutura dos Dados

### Usuário
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(85) 99999-9999",
  "senha": "hash_bcrypt",
  "created_at": "2025-11-11T10:00:00.000Z",
  "updated_at": "2025-11-11T10:00:00.000Z"
}
```

### Anúncio
```json
{
  "id": 1,
  "titulo": "iPhone 13 Pro Max",
  "descricao": "iPhone em perfeito estado, 256GB",
  "preco": 4500.00,
  "foto_url": "https://exemplo.com/foto.jpg",
  "usuario_id": 1,
  "created_at": "2025-11-11T10:00:00.000Z",
  "updated_at": "2025-11-11T10:00:00.000Z",
  "usuario": {
    "id": 1,
    "nome": "João Silva"
  }
}
```

## Regras de Negócio

1. A rota pública de listagem de anúncios mostra apenas o nome do criador, não o telefone
2. Apenas usuários autenticados podem criar, editar ou deletar anúncios
3. Um usuário só pode editar ou deletar seus próprios anúncios
4. Todos os campos são obrigatórios ao criar/editar anúncios
5. A senha é criptografada com bcrypt antes de ser salva no banco
6. A autenticação é feita via JWT armazenado em cookie HTTP-only

## Testando a API

Você pode testar a API usando ferramentas como:
- Postman
- Insomnia
- Thunder Client (extensão do VS Code)
- cURL

Exemplo com cURL:

```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","email":"joao@email.com","telefone":"(85) 99999-9999","senha":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","senha":"123456"}' \
  -c cookies.txt

# Criar anúncio
curl -X POST http://localhost:3000/api/anuncios \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"titulo":"iPhone 13","descricao":"Seminovo","preco":4000,"foto_url":"https://exemplo.com/foto.jpg"}'

# Listar todos os anúncios
curl http://localhost:3000/api/anuncios
```

## Exemplo para Aulas

Esta API foi desenvolvida de forma simples e didática para servir como exemplo em aulas. Os principais conceitos abordados:

- Arquitetura em camadas (Routes → Controllers → Repositories → Models)
- Autenticação JWT
- Relacionamentos no Sequelize
- CRUD completo
- Validações básicas
- Tratamento de erros
- Middleware de autenticação
- Rotas públicas e privadas
