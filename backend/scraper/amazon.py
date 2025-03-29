import requests
import os
import json
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()


def scrape_amazon(keyword):
    payload = { 'api_key': SCRAPER_API_KEY, 'url': f'https://www.amazon.com/s?k={keyword.replace(' ', '+')}', 'output_format': 'json', 'autoparse': 'true' }
    r = requests.get('https://api.scraperapi.com/', params=payload)
    return r.text
    

def parse_amazon_data(json_data):
    products = json.loads(json_data)
    
    parsed_products = []
    products = products.get("results", [])[:20]
    print("Parsed JSON:", json.dumps(products, indent=2))
    
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
    
    results = scrape_amazon("shampoo")
    
    print(parse_amazon_data(results))