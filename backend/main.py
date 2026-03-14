from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models import QueryRequest, QueryResponse
from gemini_service import generate_sql
from sql_service import execute_sql, generate_summary

app = FastAPI(title="AI SQL Dashboard", description="Aplicação de Inteligência de Dados com linguagem natural")

# Configurar CORS para o frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL do Next.js
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

        response = QueryResponse(
            sql=sql,
            columns=columns,
            rows=rows,
            summary=summary
        )

        # Adicionar headers CORS manualmente
        json_response = JSONResponse(content=response.dict())
        json_response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
        json_response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
        json_response.headers["Access-Control-Allow-Headers"] = "*"

        return json_response

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@app.get("/")
async def root():
    return {"message": "AI SQL Dashboard Backend"}