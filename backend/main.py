import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
from scraper.amazon import scrape_amazon, parse_amazon_data
from fuzzywuzzy import fuzz
from init_db import process
from serpapi import search as search_serpapi

load_dotenv()

app = FastAPI()

app.add_middleware(
CORSMiddleware,
allow_origins=["*"], # Allows all origins
allow_credentials=True,
allow_methods=["*"], # Allows all methods
allow_headers=["*"], # Allows all headers
)

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

serp_api = os.getenv("SERP_API_KEY")

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
    found = fuzzy(keyword)
    if found: return found

    return process(keyword, supabase)

@app.get("/image")
def get_image(keyword: str = Query(..., min_length=1)):
    params = {
    "q": f"{keyword} non branded",
    "engine": "google_images",
    "ijn": "0",
    "api_key": serp_api
    }
    
    s = search_serpapi(params)
    r = s.as_dict()
    
    return r["images_results"][0]["original"]

def fuzzy(keyword):
    # query the searched table for all names
    results = supabase.table('searched').select('name').execute()

    # variables to find the closest match
    closest_match = None
    highest_score = 0

    # find the closest match using fuzzy matching
    for row in results.data:
        name = row['name']
        score = fuzz.ratio(keyword.lower(), name.lower())
        if score > highest_score:
            closest_match = name
            highest_score = score
    
    if highest_score >= 80:
        # query the products table for matching rows
        products = supabase.table('products').select('*').filter('name', 'ilike', f'%{closest_match}%').execute()
        return products.data
    else:
        return None
