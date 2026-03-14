import google.genai as genai
from config import settings

# Configurar a API do Gemini
if settings.gemini_api_key:
    client = genai.Client(api_key=settings.gemini_api_key)
else:
    client = None

# Prompt de sistema para gerar SQL
SYSTEM_PROMPT = """
Você é um assistente especializado em gerar consultas SQL válidas para SQLite.

Schema da tabela vendas:
- id INTEGER PRIMARY KEY
- data TEXT (formato YYYY-MM-DD)
- produto TEXT
- valor_unidade REAL
- quantidade INTEGER
- total REAL
- forma_pagamento TEXT
- parcelado TEXT ('Sim' ou 'Não')

Instruções:
- Gere apenas consultas SELECT válidas para SQLite.
- Não inclua DROP, DELETE, UPDATE, INSERT ou qualquer outra operação que modifique dados.
- Use apenas a tabela 'vendas'.
- Responda apenas com o SQL, sem explicações adicionais.
- Certifique-se de que o SQL seja sintaticamente correto.

Pergunta do usuário: {question}
"""

def generate_sql(question: str) -> str:
    if not client:
        # Simulação para teste sem chave API
        if "produto" in question.lower() and "mais" in question.lower():
            return "SELECT produto, SUM(total) as total_vendas FROM vendas GROUP BY produto ORDER BY total_vendas DESC LIMIT 5"
        elif "total" in question.lower():
            return "SELECT SUM(total) as total_geral FROM vendas"
        elif "pagamento" in question.lower():
            return "SELECT forma_pagamento, COUNT(*) as quantidade FROM vendas GROUP BY forma_pagamento"
        else:
            return "SELECT * FROM vendas LIMIT 10"
    
    try:
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=SYSTEM_PROMPT.format(question=question)
        )
        sql = response.text.strip()
        # Remover possíveis markdown ou texto extra
        if sql.startswith("```sql"):
            sql = sql[6:]
        if sql.endswith("```"):
            sql = sql[:-3]
        sql = sql.strip()
        return sql
    except Exception as e:
        # Fallback para simulação se houver erro na API
        print(f"Erro na API Gemini: {e}")
        if "produto" in question.lower() and "mais" in question.lower():
            return "SELECT produto, SUM(total) as total_vendas FROM vendas GROUP BY produto ORDER BY total_vendas DESC LIMIT 5"
        elif "total" in question.lower():
            return "SELECT SUM(total) as total_geral FROM vendas"
        elif "pagamento" in question.lower():
            return "SELECT forma_pagamento, COUNT(*) as quantidade FROM vendas GROUP BY forma_pagamento"
        else:
            return "SELECT * FROM vendas LIMIT 10"