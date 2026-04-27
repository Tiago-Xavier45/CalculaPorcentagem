# Calculadora de Porcentagem

Projeto fullstack com **Spring Boot (Java)** no backend e **React** no frontend.

---

## Estrutura

```
calculadora-pct/
├── backend/          ← Spring Boot (Java 17, Maven)
└── frontend/         ← React + Vite
```

---

## Como rodar

### Backend (Spring Boot)

**Requisitos:** Java 17+ e Maven instalados.

```bash
cd backend
./mvnw spring-boot:run
```

O servidor sobe em `http://localhost:8080`.

---

### Frontend (React)

**Requisitos:** Node.js 18+ instalado.

```bash
cd frontend
npm install
npm run dev
```

O app abre em `http://localhost:5173`.

> O Vite já está configurado para fazer proxy das chamadas `/api` para o backend em `:8080`, então não precisa de CORS extra.

---

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/porcentagem/de-valor` | X% de um valor |
| POST | `/api/porcentagem/quanto-porcento` | Quanto % representa? |
| POST | `/api/porcentagem/variacao` | Variação % entre dois valores |
| POST | `/api/porcentagem/acrescimo-desconto` | Aplicar +/- % sobre valor |

### Exemplos de requisição

**POST** `/api/porcentagem/de-valor`
```json
{ "porcentagem": 15, "valor": 200 }
```
Resposta: `{ "resultado": 30.0, "descricao": "15,00% de 200,00 = 30,00" }`

**POST** `/api/porcentagem/variacao`
```json
{ "valorInicial": 100, "valorFinal": 135 }
```
Resposta: `{ "variacao": 35.0, "tipo": "aumento", "descricao": "..." }`

---

## Tecnologias

- **Java 17** + **Spring Boot 3.2**
- **React 18** + **Vite 5**
- CSS Modules
