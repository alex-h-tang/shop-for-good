import os
from fastapi import FastAPI
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("Missing Supabase environment variables")

supabase: Client = create_client(supabase_url, supabase_key)

@app.get("/")
def read_root():
    return {"message": "Supabase backend is running"}

@app.get("/test")
def test_connection():
    response = supabase.table("test_table").select("*").execute()
    return response
