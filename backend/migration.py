import json

import os

from dotenv import load_dotenv

load_dotenv()

import supabase

combined = []

PRODUCTS = [
    "hand soap",
    "shampoo",
    "chocolate bar",
    "yogurt",
    "bottled water"
]

for i in range(1,6):
    with open(f"combined_data{i}.json", "r") as json_file:
        data = json.load(json_file)
        
        for j in data:
            j["search_term"] = PRODUCTS[i-1]
        
        combined.extend(data)
        
        
        
        
combined = [i for i in combined if "message" not in i["esg"]]

for i in combined:
    i["esg"] = i["esg"][0]

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase_client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

response = supabase_client.table("products").insert(combined).execute()
print(response)