import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    database_path: str = "vendas_ficticias.db"

    class Config:
        env_file = ".env"

settings = Settings()