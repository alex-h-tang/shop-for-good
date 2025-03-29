from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time

from bs4 import BeautifulSoup

def initialize_driver():
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(options=options)
    return driver

def load_page(driver, search_term):
    url = f"https://www.target.com/s?searchTerm={search_term}"
    driver.get(url)
    wait = WebDriverWait(driver, 100)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div[data-test='product-grid']")))
    time.sleep(0.5)
    for _ in range(10):
        driver.execute_script("window.scrollBy(0, 1000);")
        time.sleep(1)
    return driver.page_source

def parse_card(card):
    title = card.find("a", {"data-test": "product-title"})
    price_element = card.find("span", {"data-test": "current-price"})
    picture = card.find("picture", {"data-test": "@web/ProductCard/ProductCardImage/primary"})
    name = title["aria-label"] if title and title.has_attr("aria-label") else None
    url = f"https://target.com{title['href']}" if title and title.has_attr("href") else None
    if price_element:
        span = price_element.find("span")
        price = span.text if span else None
    else:
        price = None
    if picture:
        source = picture.find("source")
        image_url = source["srcset"] if source and source.has_attr("srcset") else None
    else:
        image_url = None
    return name, price, url, image_url

def parse_content(content):
    soup = BeautifulSoup(content, 'html.parser')
    products = soup.find('div', {'data-test': 'product-grid'})
    children = products.find_all('div', recursive=False) if products else []
    print(f"Number of children: {len(children)}")
    
    out = []
    
    for card in children:
        name, price, url, image_url = parse_card(card)
        if not name:
            print("No aria-label found")
            continue
        
        d = {
            "name": name,
            "price": price,
            "image": image_url,
            "url": url
        }
        print(f"Product Name: {name}")
        print(f"Product Price: {price}")
        print(f"Product URL: {url}")
        print(f"Product Image URL: {image_url}")
        print("-" * 20)
        
        out.append(d)
        
    return out
        
    

def scrape_target(search_term="soap"):
    driver = initialize_driver()
    try:
        page_source = load_page(driver, search_term)
        ret = parse_content(page_source)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        driver.quit()
        
    return ret

if __name__ == "__main__":
    print(scrape_target("soap"))
