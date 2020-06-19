
TAG="site"

.PHONY: build run

build:
	docker build -t ${TAG} .

run:
	docker run -d --restart always -p 5001:5001 ${TAG}


