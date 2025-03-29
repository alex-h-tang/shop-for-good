import json
from fuzzywuzzy import process

# load company data
companies_data = json.load(open('backend/companies.json', 'r'))

# search for closest company match
def fuzzy_search(input, data):
    names = [company['companyname'] for company in data]
    return process.extractOne(input, names)

# test 
search_word = "Unilever"
result = fuzzy_search(search_word, companies_data)
print(f"Best match for '{search_word}': {result[0]} (Score: {result[1]})")