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


def company_search(product):
    return get_esg(fuzzy_search(find_parent_company(product).output[0].content[0].text)[0])

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


def get_esg(company):
    # api call to get esg json for company
    url = "https://gaialens-esg-scores.p.rapidapi.com/scores"
    api_key = os.getenv("X_RAPIDAPI_KEY")
    headers = {
        "x-rapidapi-key": api_key,
        "x-rapidapi-host": "gaialens-esg-scores.p.rapidapi.com",
        "Content-Type": "text"
    }
    # encoded_company = urllib.parse.quote(company)
    querystring = {"companyname":company}
    print(querystring)
    response = requests.get(url, headers=headers, params=querystring)
    return response.json()


if __name__ == "__main__":

    # load company data
    companies_data = json.load(open('backend/utils/companies.json', 'r'))
    
    # testing
    response = find_parent_company("Pantene")
    print(response)
    search_word = response.output[0].content[0].text
    result = fuzzy_search(search_word, companies_data)
    print(f"Best match for '{search_word}': {result[0]} (Score: {result[1]})")
    print(get_esg(result[0]))
    
    