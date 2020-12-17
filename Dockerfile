FROM nginx:1.19-alpine

RUN apk add --update py3-pip

COPY src/ src/
WORKDIR src/
RUN pip3 install markdown2 Jinja2 Pygments loguru
RUN python3 --version
RUN python3 build_site.py
WORKDIR ..

COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/conf/mime.types
RUN cp -r dist/ /var/www

ENV LISTEN_PORT 5001
EXPOSE 5001

CMD ["nginx"]
