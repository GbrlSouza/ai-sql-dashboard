import sqlite3
conn = sqlite3.connect('backend/vendas_ficticias.db')
cursor = conn.cursor()
cursor.execute('SELECT name FROM sqlite_master WHERE type="table"')
tables = cursor.fetchall()
print("Tables:", tables)
conn.close()