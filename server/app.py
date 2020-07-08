from flask import Flask, jsonify, request
import json

import time

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/cards')
def cards():

    with open('cards.json', 'r') as file:
        data = json.load(file)

    data = [{'id': key, **value} for key, value in data.items()]

    return jsonify(data)


@app.route('/sign-in', methods=['POST'])
def sign_in():
    with open('users.json', 'r') as file:
        data = json.load(file)

    username = request.json['username']
    password = request.json['password']

    time.sleep(2)

    try:
        if data[username] == password:
            return jsonify('authorized'), 202
        else:
            return jsonify('invalid username or password try again'), 401
    except:
        return jsonify('invalid username or password try again'), 401


@app.route('/sign-up', methods=['POST'])
def sign_up():
    # write to json file

    username = request.json['username']
    password = request.json['password']
    repeated_password = request.json['repeated-password']

    time.sleep(2)

    if password != repeated_password:
        return jsonify('passwords does not match'), 403

    with open('users.json', 'r') as file:
        data = json.load(file)

    if data[username]:
        return jsonify('username already exists, try another one'), 403
    else:
        # write to users.json
        return jsonify('authorized'), 202


@app.route('/deck', methods=['POST'])
def deck():
    username = request.json['username']
    deck_name = request.json['deck-name']
    deck = request.json['deck']

    if len(deck) != 8:
        return jsonify('not enough cards - 8 cards are required'), 400

    with open('decks.json', 'r') as file:
        data = json.load(file)

    try:
        data[username][deck_name] = deck
    except:
        data[username] = {}
        data[username][deck_name] = deck

    with open('decks.json', 'w') as file:
        json.dump(data, file)

    return jsonify(data), 200


@app.route('/decks', methods=['POST'])
def decks():
    username = request.json['username']

    with open('decks.json', 'r') as file:
        data = json.load(file)

    try:
        decks = data[username]
    except:
        return jsonify('user not found'), 404

    with open('cards.json', 'r') as file:
        data = json.load(file)

    response = {}

    for key, deck in decks.items():
        response[key] = [data[card_id] for card_id in deck]

    return jsonify(response), 200


@app.route('/profile')
def profile():
    pass


if __name__ == '__main__':
    app.run(debug=True)
