import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--headless")

with open('cards.json', 'r') as file:
    data = json.load(file)


with webdriver.Chrome(options=chrome_options) as driver:

    for card in data:
        card_formatted = card.replace('.', '')
        driver.get(f'https://royaleapi.com/card/{card_formatted}')

        time.sleep(1)

        try:
            card_element = driver.find_element_by_css_selector('#page_content > div.ui.container.sidemargin0 > div:nth-child(1) > div:nth-child(3) > div.ui.pink.basic.label')
            elixir_string = card_element.get_attribute('innerText')
            elixir = elixir_string.split()[-1]

            data[card]['info'] = {
                'elixir': int(elixir)
            }

        except:
            print('error', card)

with open('cards.json', 'w') as file:
    json.dump(data, file)
