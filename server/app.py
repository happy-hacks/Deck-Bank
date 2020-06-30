from flask import Flask, jsonify, request
import json

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/cards')
def cards():

    with open('cards.json', 'r') as file:
        data = json.load(file)

    return jsonify(data)


@app.route('/sign-in', methods=['POST'])
def signIn():
    with open('users.json', 'r') as file:
        data = json.load(file)

    username = request.json['username']
    password = request.json['password']

    try:
        if data[username] == password:
            return jsonify('authorized'), 202
        else:
            raise ValueError
    except:
        return jsonify('unauthorized'), 401


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
