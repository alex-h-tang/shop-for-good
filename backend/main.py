import os
from fastapi import FastAPI, Query
from supabase import create_client, Client
from dotenv import load_dotenv
from scraper.amazon import scrape_amazon, parse_amazon_data

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

@app.get("/search")
def search(keyword: str = Query(..., min_length=1)):
    # Fetch search results based on the given keyword.
    if not keyword:
        return {"error": "Keyword is required"}

    results = scrape_amazon(keyword)
    data = parse_amazon_data(results)
    return data

print(search("shampoo"))