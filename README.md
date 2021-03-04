# sentimentDemo


## Installation
run
```
docker-compose up --build
``` 
in the top level directory

The webservice is available under `localhost:3000`

## Backend
The backend runs on a Gunicorn server with Flask. It implements an API with a single endpoint: `/sentiment`. The API accepts a POST requests where the body contains the property `text` e.g.:

```JSON
{"text": "I'm happy to see you!"}
``` 

This text is then evaluated by a Sentiment Analysis Model from the Python Library NLTK. It uses VADER (Valence Aware Dictionary and sEntiment Reasoner), which is a pre-trained model that uses rule-based values tuned to sentiments from social media. (It works best on short texts like a tweet).

The API returns a JSON HTML response with the property `sentiment` which can take a value from -1 (negative sentiment) to 1 (positive sentiment). E.g: 

```JSON
{"sentiment": 0.5994}
```

## Frontend
The frontend runs on Express. It issues a POST request to the backend through the click of a button. Then it displays the return value on the bottom of the page. If the request fails, it shows an error message instead.

## Tying everything together
On top of the front- and backend there is a third service, which runs an nginx server. This way, only one port needs to be exposed. Additionaly, the backend doesn't need to be worried about CORS, as the frontend is in the same network (through docker-compose). 
The server routes requests to `localhost:8000` to the frontend, and requests to `localhost:8000/api` to the backend. 
