# Como executar o Capacita+

O sistema tem 3 partes, e elas precisam rodar **nesta ordem**:

| Parte | Pasta | Porta |
|---|---|---|
| Banco MySQL | `database/` | 3306 |
| API Java (Spring Boot) | `backend/` | 8080 |
| Interface React | `frontend/` | 5173 |

## Pré-requisitos

- Java 21
- Node.js 18 ou superior (com npm)
- MySQL 8 (Server + Workbench, opcional)
- **Não** é preciso instalar Maven: o projeto usa o Maven Wrapper (`mvnw`).

## 1. Banco de dados (MySQL)

Abra o arquivo `database/capacita_plus.sql` no **MySQL Workbench** e execute tudo (ícone do raio ⚡).
Ou, no terminal:

```bash
mysql -u root -p < database/capacita_plus.sql
```

Isso cria o banco `capacita_plus`, as tabelas `instrutores`, `cursos`, `inscricoes` e alguns dados de exemplo.

## 2. Backend (API Java)

A API usa o usuário `root`. A senha padrão configurada é `root`. Se a senha do seu MySQL for outra,
altere em `backend/src/main/resources/application.properties` (linha `spring.datasource.password`)
ou defina a variável de ambiente `DB_PASSWORD`.

```bash
cd backend
./mvnw spring-boot:run        # Linux/Mac
mvnw.cmd spring-boot:run      # Windows (PowerShell ou CMD)
```

A primeira execução demora porque baixa as dependências. Quando aparecer
`Started CapacitaPlusApplication`, teste no navegador: http://localhost:8080/api/cursos

> No Eclipse: *File > Import > Maven > Existing Maven Projects* → pasta `backend`,
> depois clique com o botão direito em `CapacitaPlusApplication.java` > *Run As > Java Application*.

## 3. Frontend (React)

Em **outro** terminal:

```bash
cd frontend
npm install     # só na primeira vez
npm run dev
```

Abra http://localhost:5173

## Endpoints da API

Os três recursos seguem o mesmo padrão (`instrutores`, `cursos`, `inscricoes`):

| Método | Endereço | Operação |
|---|---|---|
| GET | `/api/cursos` | Listar todos (Read) |
| GET | `/api/cursos/{id}` | Buscar um (Read) |
| POST | `/api/cursos` | Cadastrar (Create) |
| PUT | `/api/cursos/{id}` | Atualizar (Update) |
| DELETE | `/api/cursos/{id}` | Excluir (Delete) |

Exemplo de JSON para cadastrar um curso:

```json
{ "nome": "Excel para Trabalho", "descricao": "Planilhas", "duracao": 20, "instrutor": { "id": 1 } }
```

Exemplo de JSON para cadastrar uma inscrição:

```json
{ "nomeAluno": "Maria", "emailAluno": "maria@email.com", "curso": { "id": 1 },
  "dataInscricao": "2026-10-15", "status": "PENDENTE" }
```

## Regras de negócio

- Não é possível excluir um instrutor que ainda tenha cursos, nem um curso que tenha inscrições
  (a API responde com erro 409 e a tela mostra uma mensagem). Exclua primeiro os registros vinculados.
- Status possíveis de uma inscrição: `PENDENTE`, `CONFIRMADA`, `CONCLUIDA`, `CANCELADA`.

## Estrutura do código

```
backend/src/main/java/br/com/capacitaplus/
├── CapacitaPlusApplication.java   → inicia a API
├── model/        → entidades (cada classe = uma tabela)
├── repository/   → acesso ao banco (Spring Data JPA)
├── controller/   → endpoints REST (as 4 operações do CRUD)
└── config/       → CORS (libera o React) e tratamento de erros

frontend/src/
├── main.jsx      → ponto de entrada do React
├── App.jsx       → rotas (qual página aparece em cada endereço)
├── api.js        → funções que chamam a API Java (fetch)
├── components/   → componentes reutilizáveis: Menu, Card, Campo, Tabela, Mensagem
└── pages/        → páginas: Início, Instrutores, Cursos, Inscrições
```
