from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import QueryRequest, QueryResponse
from gemini_service import generate_sql
from sql_service import execute_sql, generate_summary

app = FastAPI(title="AI SQL Dashboard", description="Aplicação de Inteligência de Dados com linguagem natural")

# Configurar CORS para o frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],  # URL do Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/query", response_model=QueryResponse)
async def query_data(request: QueryRequest):
    try:
        # Gerar SQL com Gemini
        sql = generate_sql(request.question)
        
        # Executar SQL
        columns, rows = execute_sql(sql)
        
        # Gerar resumo
        summary = generate_summary(request.question, columns, rows)
        
        return QueryResponse(
            sql=sql,
            columns=columns,
            rows=rows,
            summary=summary
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/")
async def root():
    return {"message": "AI SQL Dashboard Backend"}