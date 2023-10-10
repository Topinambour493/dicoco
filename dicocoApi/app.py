# main.py
from flask import Flask, request, render_template, jsonify, make_response
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
import json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def hello():
    Milan = {
        "nom" : "Hergott",
        "age" : 19,
        "ville" : "Tours"
    } 
    json1= json.dumps(Milan)
    return make_response(jsonify(message="hello world", code="200", variable="ce que je veux", variable2=json1), 200)

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