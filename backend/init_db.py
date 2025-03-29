from .scraper.amazon import scrape_amazon, parse_amazon_data
from .scraper.walmart import scrape_walmart, parse_walmart_data

from .utils.company_search import company_search

import json

import os

import supabase

def init_db():
    # Load environment variables
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")

    # Initialize Supabase client
    supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

    # Load company data
    companies_data = json.load(open('backend/companies.json', 'r'))

    # Insert company data into Supabase
    for company in companies_data:
        supabase_client.table("companies").insert(company).execute()
        
        

