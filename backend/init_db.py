from scraper.amazon import scrape_amazon, parse_amazon_data
from scraper.walmart import scrape_walmart, parse_walmart_data

from utils.company_search import company_search, find_parent_company, fuzzy_search, get_esg

import json

import os

import supabase

companies_data = json.load(open('backend/utils/companies.json', 'r'))

PRODUCTS = [
    "hand soap",
    "shampoo",
    "chocolate bar",
    "yogurt",
    "bottled water"
]

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

import os

def process(product, client):
    # Scrape data from Amazon and Walmart
    amazon_data = scrape_amazon(product)
    walmart_data = scrape_walmart(product)

    # Parse the scraped data
    parsed_amazon_data = parse_amazon_data(amazon_data)
    parsed_walmart_data = parse_walmart_data(walmart_data)

    # Combine the data
    combined_data = parsed_amazon_data + parsed_walmart_data
    
    companies = set()

    for item in combined_data:
        item['parent_company'] = fuzzy_search(find_parent_company(item['name']), companies_data)[0]
        companies.add(item['parent_company'])
        print(item['parent_company'])
        
    import time
    esgs = {}
    for com in companies:
        time.sleep(1)
        esgs[com] = get_esg(com)
    
    for item in combined_data:
        item["esg"] = esgs[item['parent_company']]
        
    combined = [i for i in combined_data if "message" not in i["esg"]]

    for i in combined:
        i["esg"] = i["esg"][0]
        i["search_term"] = product
        
    client.table("products").insert(combined).execute()
    return combined
    
if __name__ == "__main__":
    supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)
    for product in PRODUCTS:
        process(product, supabase_client)
