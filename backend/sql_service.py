import sqlite3
import re
from typing import List, Tuple, Any
from config import settings

def validate_sql(sql: str) -> bool:
    # Verificar se é apenas SELECT
    sql_upper = sql.upper().strip()
    if not sql_upper.startswith("SELECT"):
        return False
    # Bloquear palavras proibidas
    forbidden = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "CREATE", "TRUNCATE"]
    for word in forbidden:
        if word in sql_upper:
            return False
    return True

def execute_sql(sql: str) -> Tuple[List[str], List[List[Any]]]:
    if not validate_sql(sql):
        raise ValueError("Consulta SQL inválida ou não permitida.")
    
    conn = sqlite3.connect(settings.database_path)
    cursor = conn.cursor()
    try:
        cursor.execute(sql)
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        return columns, rows
    except Exception as e:
        raise ValueError(f"Erro ao executar SQL: {str(e)}")
    finally:
        conn.close()

def generate_summary(question: str, columns: List[str], rows: List[List[Any]]) -> str:
    # Resumo simples baseado nos dados
    num_rows = len(rows)
    if num_rows == 0:
        return "Nenhum resultado encontrado para a consulta."
    summary = f"Encontrei {num_rows} resultado(s). "
    if len(columns) > 0:
        summary += f"Colunas: {', '.join(columns)}. "
    # Adicionar mais lógica se necessário
    return summary