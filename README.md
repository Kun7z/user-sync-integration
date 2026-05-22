# User Sync Integration (Node.js + SQLite)

Projeto de integração que consome a API RandomUser, processa os dados, persiste em banco SQLite e gera relatórios de sincronização.

---

## Objetivo

Simular um sistema de sincronização de usuários:

- Consumir dados de uma API externa
- Filtrar e processar usuários
- Persistir dados em banco local (SQLite)
- Atualizar registros existentes
- Gerar relatório de execução
- Registrar logs de cada execução

---

## Tecnologias

- Node.js
- TypeScript
- Express
- Knex
- SQLite3
- Axios

---

## Instalação

### 1. Clonar o projeto

```bash
git clone https://github.com/Kun7z/user-sync-integration.git
cd user-sync-integration
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

e sete a porta para rodar a aplicação

---

## Banco de Dados

O projeto utiliza SQLite local.

### Caminho do banco:

```
src/storage/database.sqlite
```

---

## Migrations

### Criar migration

```bash
npx knex migrate:make create_users
```

### Executar migrations

```bash
npx knex migrate:latest
```

---

## API Externa

```
https://randomuser.me/api/?results=150
```

---

## Regras de negócio

- Apenas usuários com 18 anos ou mais são processados
- Email é chave primária
- Se existir → atualiza
- Se não existir → insere

---

## Endpoints

### POST /users/sync

Executa sincronização completa:

- consumo da API
- persistência no banco
- geração de relatório

---

### GET /

Health check

---

### 404 Handler

Retorna:

```json
{
  "status": "error",
  "message": "Route not found",
  "path": "/rota-invalida"
}
```

---

## Relatório

Gera:

- totalFetched
- inserted
- updated
- ignored
- errors
- durationMs

---

## Logs

Local:

```
/logs
```

Arquivo:

```
report-{timestamp}.json
```

---

## Execução

```bash
npm run dev
```

ou

```bash
npm run start
```

---

## Autor: Eric Matheus Kuntz Thibes

Desafio técnico de integração de sistemas.
