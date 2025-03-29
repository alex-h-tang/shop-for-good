import json
import os
import requests
from fuzzywuzzy import process
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
)

# load company data
companies_data = json.load(open('backend/companies.json', 'r'))

def find_parent_company(company):
    response = client.responses.create(
        model="gpt-4o",
        input=f"Find me the parent company for {company}, output so that the name is easily parsed, ideally one phrase. If {company} has no parent company, just return the name of the company."
    )
    return response

# search for closest company match
def fuzzy_search(input, data):
    names = [company['companyname'] for company in data]
    return process.extractOne(input, names)

# api call to get esg json for company
url = "https://gaialens-esg-scores.p.rapidapi.com/scores"
headers = {
	"x-rapidapi-key": "5a768ad3fcmsh267709c9db7f529p195befjsn0c88469fb16e",
	"x-rapidapi-host": "gaialens-esg-scores.p.rapidapi.com",
	"Content-Type": "text"
}
def get_esg(company):
    # encoded_company = urllib.parse.quote(company)
    querystring = {"companyname":company}
    print(querystring)
    response = requests.get(url, headers=headers, params=querystring)
    return response.json()

# testing
response = find_parent_company("Pantene")
print(response)
search_word = response.output[0].content[0].text
result = fuzzy_search(search_word, companies_data)
print(f"Best match for '{search_word}': {result[0]} (Score: {result[1]})")
print(get_esg(result[0]))