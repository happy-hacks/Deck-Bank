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
        formatted_card_name = data[card]['name'].replace(' ', '+')
        driver.get(f'https://statsroyale.com/card/{formatted_card_name}')
        time.sleep(1)

        try:
            card_element = driver.find_element_by_class_name('card__rarity')
            info_string = card_element.get_attribute('innerText')
            info_list = info_string.split(', ')

            elements = driver.find_elements_by_class_name('card__metricContent')
            element = elements.pop(0)
            rarity = element.find_element_by_class_name('card__count')

            data[card]['info']['type'] = info_list[0].lower()
            data[card]['info']['arena'] = info_list[1].lower()
            data[card]['info']['rarity'] = rarity.get_attribute('innerText').lower()

            data[card]['stats'] = dict()

            for element in elements:
                key = element.find_element_by_class_name('card__metricCaption').get_attribute('innerText').lower()
                value = element.find_element_by_class_name('card__count').get_attribute('innerText').lower()
                data[card]['stats'][key] = value

        except:
            print('error', card)

with open('cards.json', 'w') as file:
    json.dump(data, file)
