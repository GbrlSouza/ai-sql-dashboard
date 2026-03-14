import sqlite3
import random
from datetime import datetime, timedelta

def create_database():
    conn = sqlite3.connect('vendas_ficticias.db')
    cursor = conn.cursor()

    # Criar tabela vendas
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS vendas (
            id INTEGER PRIMARY KEY,
            data TEXT,
            produto TEXT,
            valor_unidade REAL,
            quantidade INTEGER,
            total REAL,
            forma_pagamento TEXT,
            parcelado TEXT
        )
    ''')

    # Inserir dados fictícios
    produtos = ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E']
    formas_pagamento = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito', 'Pix']
    parcelado_opcoes = ['Sim', 'Não']

    for i in range(1000):  # Inserir 1000 registros fictícios
        data = (datetime.now() - timedelta(days=random.randint(0, 365))).strftime('%Y-%m-%d')
        produto = random.choice(produtos)
        valor_unidade = round(random.uniform(10.0, 500.0), 2)
        quantidade = random.randint(1, 10)
        total = round(valor_unidade * quantidade, 2)
        forma_pagamento = random.choice(formas_pagamento)
        parcelado = random.choice(parcelado_opcoes)

        cursor.execute('''
            INSERT INTO vendas (data, produto, valor_unidade, quantidade, total, forma_pagamento, parcelado)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (data, produto, valor_unidade, quantidade, total, forma_pagamento, parcelado))

    conn.commit()
    conn.close()
    print("Banco de dados criado com sucesso!")

if __name__ == "__main__":
    create_database()