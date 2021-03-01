from flask import Flask
from flask import request
from flask_cors import CORS
from nltk.sentiment import SentimentIntensityAnalyzer


app = Flask(__name__)
CORS(app)

sia = SentimentIntensityAnalyzer()

@app.route('/sentiment', methods=["POST"])
def analyze_sentiment():
    input_text = request.get_json()["text"]
    sentiment = sia.polarity_scores(input_text)["compound"]
    output = {"sentiment": sentiment}
    return output