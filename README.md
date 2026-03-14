# 🤖 AI SQL Dashboard

Uma aplicação completa de Inteligência de Dados que permite aos usuários fazer perguntas em linguagem natural sobre dados de vendas. Utilizando IA (Google Gemini), o sistema converte perguntas em consultas SQL, executa no banco de dados SQLite e apresenta os resultados em tabelas e gráficos interativos com design Bootstrap ERP moderno.

## ✨ Funcionalidades

- 🗣️ **Consultas em Linguagem Natural**: Faça perguntas como "Quais são os produtos mais vendidos?" ou "Qual o total de vendas por mês?"
- 🤖 **IA Avançada**: Integração com Google Gemini para conversão automática de perguntas em SQL
- 📊 **Visualizações Interativas**: Gráficos automáticos (barras, pizza) com Chart.js
- 📋 **Tabelas Responsivas**: Exibição de dados em tabelas Bootstrap com formatação adequada
- 🛡️ **Segurança SQL**: Validação rigorosa para permitir apenas consultas SELECT seguras
- 🎨 **Design ERP**: Interface limpa e profissional com Bootstrap, ideal para sistemas empresariais
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile

## 🏗️ Arquitetura

### Backend (Python/FastAPI)
- **API REST**: Endpoints para processamento de consultas
- **Validação SQL**: Garante segurança e previne operações não autorizadas
- **Integração Gemini**: Conversão de linguagem natural para SQL
- **Execução de Consultas**: Interface com SQLite

### Frontend (React/Next.js)
- **Interface de Chat**: Input intuitivo para perguntas
- **Exibição de Resultados**: Tabela e gráfico dinâmicos
- **Layout Bootstrap**: Design ERP profissional e responsivo

### Banco de Dados (SQLite)
- **Dados de Vendas**: 150 registros realistas de produtos tecnológicos
- **Esquema Otimizado**: Tabela vendas com campos relevantes

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python 3.8+**
- **FastAPI**: Framework web moderno e rápido
- **Google Gemini API**: IA para processamento de linguagem natural
- **SQLite**: Banco de dados leve e embutido
- **Pydantic**: Validação de dados
- **Uvicorn**: Servidor ASGI

### Frontend
- **React 18**: Biblioteca para interfaces
- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Bootstrap 5**: Framework CSS para design ERP
- **Chart.js**: Biblioteca de gráficos
- **Axios**: Cliente HTTP

### Desenvolvimento
- **Git**: Controle de versão
- **VS Code**: Ambiente de desenvolvimento
- **PowerShell**: Terminal no Windows

## 🚀 Como Executar

### Pré-requisitos

- Python 3.8 ou superior
- Node.js 16 ou superior
- Chave da API do Google Gemini (opcional - sem ela, usa simulações)

### 1. Clonagem e Configuração

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd ai-sql-dashboard

# Configure a API do Gemini (opcional)
cp backend/.env.example backend/.env
# Edite backend/.env e adicione: GEMINI_API_KEY=sua_chave_aqui
```

### 2. Backend

```bash
# Navegue para o backend
cd backend

# Instale dependências
pip install -r ../requirements.txt

# Crie o banco de dados
python database.py

# Execute o servidor
python main.py
```

O backend estará rodando em `http://localhost:8000`.

### 3. Frontend

```bash
# Em outro terminal, navegue para o frontend
cd frontend

# Instale dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:3000`.

### 4. Uso

1. Abra `http://localhost:3000` no navegador
2. Digite uma pergunta como "Quais produtos venderam mais?"
3. Veja os resultados na tabela e gráfico

## 📡 API Endpoints

### POST /query
Processa uma consulta em linguagem natural.

**Request:**
```json
{
  "question": "Qual o total de vendas por produto?"
}
```

**Response:**
```json
{
  "sql": "SELECT produto, SUM(total) as total_vendas FROM vendas GROUP BY produto ORDER BY total_vendas DESC",
  "columns": ["produto", "total_vendas"],
  "rows": [
    ["Notebook Gamer", 135000.00],
    ["Monitor 4K", 126000.00]
  ],
  "summary": "Encontrei 8 produtos com vendas totais."
}
```

## 📊 Esquema do Banco de Dados

### Tabela: vendas
- `id` (INTEGER PRIMARY KEY): ID único
- `data` (TEXT): Data da venda (YYYY-MM-DD)
- `produto` (TEXT): Nome do produto
- `valor_unidade` (REAL): Preço unitário
- `quantidade` (INTEGER): Quantidade vendida
- `total` (REAL): Valor total da venda
- `forma_pagamento` (TEXT): Pix, Cartão, etc.
- `parcelado` (TEXT): Sim/Não

### Dados de Exemplo
- 150 vendas de produtos tecnológicos
- Período: Janeiro a Outubro de 2025
- Produtos: Notebook Gamer, Monitor 4K, Teclado Mecânico, etc.

## 🔧 Desenvolvimento

### Estrutura do Projeto
```
ai-sql-dashboard/
├── backend/
│   ├── main.py              # Servidor FastAPI
│   ├── database.py          # Geração do banco
│   ├── gemini_service.py    # Serviço Gemini
│   ├── sql_service.py       # Validação e execução SQL
│   ├── models.py            # Modelos de dados
│   ├── config.py            # Configurações
│   ├── .env                 # Variáveis de ambiente
│   └── vendas_ficticias.db  # Banco SQLite
├── frontend/
│   ├── app/
│   │   ├── layout.tsx       # Layout global
│   │   ├── page.tsx         # Página principal
│   │   └── globals.css      # Estilos globais
│   ├── components/
│   │   ├── Chat.tsx         # Componente de chat
│   │   ├── Table.tsx        # Tabela de resultados
│   │   └── Chart.tsx        # Gráficos
│   ├── package.json
│   └── next.config.js
├── requirements.txt          # Dependências Python
├── README.md                 # Este arquivo
└── LICENSE                   # Licença
```

### Scripts Úteis

```bash
# Backend
cd backend
python database.py          # Recriar banco
python main.py             # Executar servidor

# Frontend
cd frontend
npm run build              # Build de produção
npm run start              # Servidor de produção
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙋 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Verifique os logs do backend/frontend
- Certifique-se de que as portas 8000 e 3000 estão livres

---

**Desenvolvido com ❤️ para demonstrar o poder da IA em análise de dados.**
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