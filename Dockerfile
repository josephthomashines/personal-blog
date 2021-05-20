FROM nginx:stable-alpine

RUN apk --no-cache update
RUN apk --no-cache upgrade
RUN apk --no-cache add --update \
  linux-headers build-base py3-pip python3-dev gcc libc-dev libffi-dev
RUN pip3 install --upgrade pip

COPY src/ src/
WORKDIR src/
RUN pip3 install -r requirements.txt
RUN python3 --version
RUN python3 build_site.py
WORKDIR ..

COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/conf/mime.types
RUN cp -r dist/ /var/www

ENV LISTEN_PORT 5001
EXPOSE 5001

CMD ["nginx"]
