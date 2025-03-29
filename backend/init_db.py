from .scraper.amazon import scrape_amazon, parse_amazon_data
# from .scraper.walmart import scrape_walmart, parse_walmart_data

from .utils.company_search import find_parent_company, fuzzy_search, get_esg

import json

import os

from dotenv import load_dotenv

import supabase



