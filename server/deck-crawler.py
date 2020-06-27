import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--window-size=1920x1080")

with open('cards.json', 'r') as file:
    data = json.load(file)


def get_values(driver, index):
    time.sleep(5)
    cards = driver.find_elements_by_class_name('card')

    for n, card_element in enumerate(cards):
        img_element = card_element.find_element_by_tag_name('img')

        title = card_element.get_attribute('title')
        image_url = img_element.get_attribute('src')
        key = title.replace(' ', '-').lower()

        data[key] = {
            "name": title,
            "image-url": image_url,
            "api-code": index + n
        }


with webdriver.Chrome(options=chrome_options) as driver:

    # warriors
    for index in range(26000000, 26000080, 8):
        driver.get(f'https://link.clashroyale.com/deck/en?deck={index + 0};{index + 1};{index + 2};{index + 3};{index + 4};{index + 5};{index + 6};{index + 7}')
        get_values(driver, index)

    # launchers 1
    for index in range(27000000, 27000012, 8):
        driver.get(f'https://link.clashroyale.com/deck/en?deck={index + 0};{index + 1};{index + 2};{index + 3};{index + 4};{index + 5};{index + 6};{index + 7}')
        get_values(driver, index)

    # launchers 2
    for index in range(28000000, 28000018, 8):
        driver.get(f'https://link.clashroyale.com/deck/en?deck={index + 0};{index + 1};{index + 2};{index + 3};{index + 4};{index + 5};{index + 6};{index + 7}')
        get_values(driver, index)


with open('cards.json', 'w') as file:
    json.dump(data, file)
