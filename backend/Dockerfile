FROM python:3-alpine

WORKDIR /user/src/app

RUN apk add --no-cache --virtual .build-deps gcc musl-dev
RUN pip install cython

COPY requirements.txt ./

# RUN apk del .build-deps gcc musl-dev

RUN pip install --no-cache-dir -r requirements.txt

RUN python -m nltk.downloader vader_lexicon

COPY . .

EXPOSE 80

CMD ["python", "flaskr/__init__.py"]