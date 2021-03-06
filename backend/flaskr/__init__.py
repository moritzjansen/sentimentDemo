from flask import Flask
from flask import request
from nltk.sentiment import SentimentIntensityAnalyzer


app = Flask(__name__)


sia = SentimentIntensityAnalyzer()

@app.route('/sentiment', methods=["POST"])
def analyze_sentiment():
    input_text = request.get_json()["text"]
    sentiment = sia.polarity_scores(input_text)["compound"]
    return {"sentiment": sentiment}

if __name__ == "__main__":
    app.run(port=80, host='0.0.0.0')