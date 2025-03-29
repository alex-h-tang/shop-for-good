import requests
import os
from dotenv import load_dotenv

load_dotenv()

SCRAPER_API_KEY = os.getenv("SCRAPER_API_KEY")

def scrape_walmart(keyword):
    payload = { 'api_key': SCRAPER_API_KEY, 'query': keyword}
    r = requests.get('https://api.scraperapi.com/structured/walmart/search', params=payload)
    return r.json()["items"]

def parse_walmart_data(json_data):
    parsed_products = []
    products = json_data[:20]
    
    for product in products:
        parsed_products.append({
            "name": product.get("name"),
            "price": product.get("price"),
            "image": product.get("image"),
            "url": product.get("url")
        })
    
    return parsed_products

if __name__ == "__main__":
    SCRAPER_API_KEY = os.getenv("SCRAPER_API_KEY")
    
    results = scrape_walmart("shampoo")
    
    print(parse_walmart_data(results))