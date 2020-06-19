FROM tiangolo/uwsgi-nginx-flask:python3.8

COPY ./app /app
WORKDIR /app

RUN pip3 install -r requirements.txt

ENV LISTEN_PORT 5001
EXPOSE 5001
