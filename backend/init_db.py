from scraper.amazon import scrape_amazon, parse_amazon_data
from scraper.walmart import scrape_walmart, parse_walmart_data

from utils.company_search import company_search

import json

import os

import supabase

PRODUCTS = [
    "hand soap",
    "shampoo",
    "chocolate bar",
    "yogurt",
    "bottled water"
]

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

for product in PRODUCTS:
    # Scrape data from Amazon and Walmart
    amazon_data = scrape_amazon(product)
    walmart_data = scrape_walmart(product)

    # Parse the scraped data
    parsed_amazon_data = parse_amazon_data(amazon_data)
    parsed_walmart_data = parse_walmart_data(walmart_data)

    # Combine the data
    combined_data = parsed_amazon_data + parsed_walmart_data

    print(len(combined_data))
    
    break
    



        

