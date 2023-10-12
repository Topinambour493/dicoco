# main.py
from flask import Flask, request, render_template, jsonify, make_response
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from tools import transform_in_json
import json
import csv

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello():
    dico=list(csv.reader(open("Dico.csv")))
    return make_response(jsonify(message="hello world", code="200", dict=transform_in_json(dico[1:10]) ), 200)

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "dicoco"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

if __name__ == "__main__":
    app.run(debug=True)