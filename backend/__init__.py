from flask import Flask
from flask import request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route('/sentiment', methods=["POST"])
def hello_world():
    output = {"sentiment": random.uniform(-1,1)}
    print(request.get_json())
    return output