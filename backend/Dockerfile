FROM python:3-alpine

WORKDIR /user/src/app

RUN apk add --no-cache --virtual .build-deps gcc musl-dev \
    && pip install --no-cache-dir cython gunicorn 

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN python -m nltk.downloader vader_lexicon

COPY . .

EXPOSE 80

CMD ["gunicorn","--bind=0.0.0.0:80", "flaskr:app"]