from pydantic import BaseModel
from typing import List, Any

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    sql: str
    columns: List[str]
    rows: List[List[Any]]
    summary: str