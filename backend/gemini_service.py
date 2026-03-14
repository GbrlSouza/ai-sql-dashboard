import google.generativeai as genai
from config import settings

# Configurar a API do Gemini
genai.configure(api_key=settings.gemini_api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

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
    prompt = SYSTEM_PROMPT.format(question=question)
    response = model.generate_content(prompt)
    sql = response.text.strip()
    # Remover possíveis markdown ou texto extra
    if sql.startswith("```sql"):
        sql = sql[6:]
    if sql.endswith("```"):
        sql = sql[:-3]
    sql = sql.strip()
    return sql