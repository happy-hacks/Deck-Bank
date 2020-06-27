from flask import Flask, jsonify
import json

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/cards')
def cards():

    with open('cards.json', 'r') as file:
        data = json.load(file)

    return jsonify(data)


@app.route('/login')
def login():
    pass


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
