import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    database_path: str = os.path.join(os.path.dirname(__file__), "vendas_ficticias.db")

    class Config:
        env_file = ".env"

settings = Settings()