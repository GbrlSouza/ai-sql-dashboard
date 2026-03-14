# 🤖 AI SQL Dashboard

Uma aplicação moderna e elegante de Inteligência de Dados baseada em linguagem natural que permite aos usuários fazer perguntas sobre dados de vendas usando linguagem natural. O sistema converte perguntas em SQL usando Google Gemini, executa as consultas em um banco SQLite e apresenta os resultados em tabelas e gráficos interativos.

## ✨ Características Visuais

- 🎨 **Design Moderno**: Interface com gradientes, sombras suaves e animações elegantes
- 📱 **Responsivo**: Layout adaptável para desktop e mobile
- 🌈 **Paleta de Cores**: Gradientes vibrantes e cores harmoniosas
- ⚡ **Animações**: Transições suaves e efeitos hover interativos
- 📊 **Gráficos Avançados**: Visualizações com tooltips personalizados e formatação monetária
- 🎯 **UX Intuitiva**: Componentes bem organizados com ícones expressivos

## 🏗️ Arquitetura

A aplicação é dividida em backend e frontend:

- **Backend (Python/FastAPI)**: Gerencia a lógica de negócio, integração com Gemini API e execução de SQL.
- **Frontend (React/Next.js)**: Interface responsiva com chat, tabela e gráficos automáticos.
- **Banco de Dados (SQLite)**: Armazena dados de vendas fictícios.

## 🛠️ Tecnologias

- **Backend**: Python, FastAPI, Google Gemini API
- **Frontend**: React, Next.js, Chart.js, Tailwind CSS
- **Banco**: SQLite
- **IA**: Google Gemini 2.0 Flash Experimental

## Como Rodar Localmente

### Pré-requisitos

- Python 3.8+
- Node.js 16+
- Chave da API do Google Gemini

### Configuração da API Gemini

1. Obtenha uma chave da API do Google Gemini em [Google AI Studio](https://makersuite.google.com/app/apikey).
2. Copie o arquivo `.env.example` para `.env` no diretório `backend` e adicione sua chave:
   ```
   GEMINI_API_KEY=sua_chave_aqui
   ```

### Executar o Banco de Dados

1. Navegue para o diretório `backend`:
   ```bash
   cd backend
   ```

2. Execute o script para criar o banco:
   ```bash
   python database.py
   ```

### Executar o Backend

1. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

2. Execute o servidor:
   ```bash
   uvicorn main:app --reload
   ```

O backend estará disponível em `http://localhost:8000`.

### Executar o Frontend

1. Navegue para o diretório `frontend`:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O frontend estará disponível em `http://localhost:8000`.

## Estrutura do Projeto

```
ai-sql-dashboard/
├── backend/
│   ├── main.py          # API FastAPI
│   ├── database.py      # Script para criar banco SQLite
│   ├── gemini_service.py # Integração com Gemini
│   ├── sql_service.py   # Execução e validação de SQL
│   ├── models.py        # Modelos Pydantic
│   └── config.py        # Configurações
├── frontend/
│   ├── app/
│   │   └── page.tsx     # Página principal
│   ├── components/
│   │   ├── Chat.tsx     # Componente de chat
│   │   ├── Table.tsx    # Tabela de resultados
│   │   └── Chart.tsx    # Gráfico automático
│   └── services/
│       └── api.ts       # Serviço de API
├── vendas_ficticias.db  # Banco SQLite
├── requirements.txt     # Dependências Python
├── package.json         # Dependências Node.js
└── README.md
```

## 💬 Exemplos de Perguntas

- "Qual produto vendeu mais?"
- "Quanto foi vendido no total?"
- "Quais vendas foram parceladas?"
- "Qual é a média de valor por produto?"
- "Quantas vendas houve por forma de pagamento?"
- "Mostre as vendas dos últimos 30 dias"

## 🚀 Demonstração

![AI SQL Dashboard](https://via.placeholder.com/800x400/6366f1/ffffff?text=AI+SQL+Dashboard+Demo)

*A interface moderna com gradientes, animações e visualizações interativas.*

## 🎨 Interface e UX

### Componentes Principais
- **Header Gradiente**: Cabeçalho com gradiente azul-roxo e animações
- **Chat Inteligente**: Campo de entrada com sugestões de perguntas e botão animado
- **Cards Elegantes**: Resultados organizados em cards com gradientes coloridos
- **Tabela Moderna**: Tabela responsiva com zebra stripes e hover effects
- **Gráficos Interativos**: Visualizações com tooltips personalizados e formatação brasileira

### Funcionalidades Visuais
- Animações de entrada suaves
- Efeitos hover em todos os componentes
- Scrollbar customizado
- Notificações de erro elegantes
- Loading states com spinners animados
- Responsividade completa

## 📊 Funcionalidades

- Conversão de linguagem natural para SQL usando IA
- Validação e execução segura de consultas SQL (apenas SELECT)
- Visualização de dados em tabelas e gráficos automáticos
- Interface responsiva e moderna
- Tratamento de erros e mensagens amigáveis
- Detecção automática de tipos de gráfico (barra, linha, pizza)

## Segurança

- Apenas consultas SELECT são permitidas
- Validação rigorosa de SQL gerado pela IA
- Bloqueio de operações de modificação de dados

## Desenvolvimento

Para contribuir ou modificar:

1. Clone o repositório
2. Configure o ambiente conforme instruções acima
3. Faça suas modificações
4. Teste localmente
5. Faça commit e push

## Licença

Este projeto está sob a licença MIT.