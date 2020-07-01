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


@app.route('/deck')
def deck():
    # GET, PUT, UPDATE & DELETE
    pass


@app.route('/decks')
def decks():
    pass


@app.route('/profile')
def profile():
    pass


if __name__ == '__main__':
    app.run(debug=True)
