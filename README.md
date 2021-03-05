# sentimentDemo


## Installation
Please run
```
docker-compose up --build
``` 
in the top-level directory to build and run the images. The docker-compose file specifies to run with version 3.9. If you are using an older version of  the docker engine, please adjust the version accordingly. [(docs)](https://docs.docker.com/compose/compose-file/compose-versioning/) 

After startup, the webservice is available under `localhost:3000`.

**Alternatively** you can test the front- and backend independently by starting the containers separately. Both containers listen on port 80 inside of the container so you have to map it to a different port on your machine on startup like so:  
```
docker run -p 5000:80 backend
```
This assumes that you have already build the image with a tag of `backend`. If you have run the docker-compose command before you should already have this image.
If you don't have the image yet please run
```
docker build -t backend .
```
inside the backend folder first. Repeat the same process for the frontend. Be sure to use a different port on the second container. 

**NOTE**: When starting the two containers without the docker-compose they won't be able to communicate with each other! 

## Backend
The backend runs on a Gunicorn server with Flask. It implements an API with a single endpoint: `/sentiment`. The API accepts a POST requests where the body contains the property `text` e.g.:

```JSON
{"text": "I'm happy to see you!"}
``` 

This text is then evaluated by a Sentiment Analysis Model from the Python Library NLTK. It uses VADER (Valence Aware Dictionary and sEntiment Reasoner), which is a pre-trained model that uses rule-based values tuned to sentiments from social media. (It works best on short texts like a tweet.)

The API returns a JSON HTML response with the property `sentiment` which can take a numeric value from -1 (very negative sentiment) to 1 (very positive sentiment). E.g.: 

```JSON
{"sentiment": 0.6114}
```

## Frontend
The frontend runs on Express. It issues a POST request to the backend through the click of a button. Then it displays the return value on the bottom of the page. If the request fails, it shows an error message instead.

## Tying everything together
On top of the front- and backend there is a third service, which runs an nginx server as a Reverse-Proxy. This way, only one port needs to be exposed. Additionally, the backend doesn't need to be worried about CORS, as the frontend is in the same network (through docker-compose). 
The server routes requests to `localhost:3000` to the frontend, and requests to `localhost:3000/api` to the backend. 
